import { XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import { AABB, Color, Vec2D } from 'dynamojs-engine';
import {
  ExitAttachment,
  Layer,
  LayerTiles,
  Light,
  NarrowAttachment,
  ServerMap,
  Tile,
  TileAttachment,
  TileImage,
  WorldMapSocketData,
} from 'horror-simulation';

/**
 * Meta data for a tileset
 */
interface Tileset {
  /**
   * Filename of the tileset image
   */
  imagefile: string;

  /**
   * First GID of the tileset
   */
  firstgid: Tile;

  /**
   * Total number of tiles in the tileset
   */
  tilecount: number;

  /**
   * Size of the grid (dimensions of `sprites`)
   */
  gridsize: Vec2D;
}

/**
 * Helper function set the fields of an attachment from raw key-value string pairs
 *
 * @param key
 * @param val
 * @param attachment
 */
function makeAttachment<Type extends TileAttachment['type']>(
  type: Type,
  rect: AABB,
  fields: Map<string, string>
): TileAttachment {
  if (type === 'Blocker') {
    return { type, rect };
  } else if (type === 'Collider') {
    return { type, rect };
  } else if (type === 'Exit') {
    const targetMap = fields.get('targetmap') || '.';
    const targetSpawnId = fields.get('spawn') || '0';
    return {
      type,
      rect,
      targetMap,
      targetSpawnId,
    };
  } else if (type === 'Light Source') {
    const [r, g, b] = (fields.get('color') || '255,255,255')
      .split(',')
      .map(parseFloat);
    const [x, y] = (fields.get('direction') || '0,0')
      .split(',')
      .map(parseFloat);
    const color = new Color(r, g, b);
    const radius = parseFloat(fields.get('radius') || '100');
    const halfAngle = parseFloat(
      fields.get('half-angle') || '3.141592653589793'
    );
    const direction = new Vec2D(x, y).unit();
    return {
      type,
      rect,
      color,
      radius,
      halfAngle,
      direction,
    };
  } else if (type === 'Occluder') {
    return { type, rect };
  } else {
    const id = fields.get('id') || '0';
    return {
      type,
      rect,
      id,
    };
  }
}

/**
 * Map generated from a TMX file
 */
class TmxMap implements ServerMap {
  private directory: string;

  private parser: XMLParser;

  public attachments: Map<Tile, Map<TileAttachment['type'], TileAttachment[]>>;

  public layers: Map<Layer, LayerTiles>;

  public tilesets: Map<string, Tileset>;

  public sprites: Map<Tile, TileImage>;

  public size: Vec2D;

  public tilesize: Vec2D;

  public navmesh: number[][];

  public wallmesh: number[][];

  public waypoints: Vec2D[];

  public outdoors: boolean;

  public raining: boolean;

  /**
   * Load a map from a TMX file
   *
   * @param file
   */
  constructor(file: string) {
    this.directory = file.split('/').slice(0, -1).join('/');
    this.parser = new XMLParser({
      ignoreAttributes: false,
      allowBooleanAttributes: true,
      isArray: (name, jpath, isLeafNode, isAttribute) => {
        return !isAttribute;
      },
    });

    this.layers = new Map(); // Tilemap layers
    this.attachments = new Map(); // All tile-specific attachments

    this.tilesets = new Map();
    this.sprites = new Map();

    this.size = new Vec2D(0, 0);
    this.tilesize = new Vec2D(0, 0);

    this.navmesh = [];
    this.wallmesh = [];
    this.waypoints = [];
    this.outdoors = false;
    this.raining = true;

    const buffer = readFileSync(file);
    this.parseTmx(this.parser.parse(buffer));
  }

  /**
   * Parse the TMX file
   *
   * @param tmx
   */
  private parseTmx(tmx: any) {
    const map = tmx['map'][0];

    // Tile dimensions
    const tilewidth = parseInt(map['@_tilewidth']);
    const tileheight = parseInt(map['@_tileheight']);
    if (isNaN(tilewidth) || isNaN(tileheight)) {
      throw new Error('Invalid tile dimensions!');
    }
    this.tilesize = new Vec2D(tilewidth, tileheight);

    // Grid size
    const width = parseInt(map['@_width']);
    const height = parseInt(map['@_height']);
    if (isNaN(width) || isNaN(height)) {
      throw new Error('Invalid map dimensions!');
    }
    this.size = new Vec2D(width, height);

    // Parse map properties
    const properties: any[] = map['properties'] || [];
    properties.forEach((child) => {
      const property = child['property'][0];
      if (property['@_name'] === 'Outdoors') {
        this.outdoors = property['@_value'] === 'true';
      }
    });

    // Parse tilesets
    const tilesets: any[] = map['tileset'] || [];
    tilesets.forEach((tileset) => {
      const file = tileset['@_source'];
      const firstgid = parseInt(tileset['@_firstgid']);
      if (isNaN(firstgid) || !file) {
        throw new Error('Invalid tileset found!');
      }

      const buffer = readFileSync(`${this.directory}/${file}`);
      const tsx = this.parser.parse(buffer);
      this.parseTsx(tsx, firstgid);
    });

    // Parse each layer
    const layers: any[] = map['layer'] || [];
    layers.forEach((layer) => {
      const data = layer['data'][0]['#text'];
      const name = layer['@_name'];
      this.layers.set(name as Layer, this.readLayer(data));
    });

    this.generateNavmesh();
    this.generateWallmesh();
    this.generateWaypoints();
  }

  /**
   * Get the tiles from the tileset file
   *
   * @param tsx
   * @param firstgid
   */
  private parseTsx(tsx: any, firstgid: number) {
    const tileset = tsx['tileset'][0];
    const id = tileset['@_name'];
    if (!id) {
      throw new Error('TSX file may be corrupted! `name` field not found');
    }

    const image = tileset['image'][0];
    if (!image) {
      throw new Error(
        'TSX file may be corrupted! Tileset image specifications not defined.'
      );
    }

    const imagefile = image['@_source'];
    const imagewidth = parseInt(image['@_width']);
    const imageheight = parseInt(image['@_height']);
    if (!imagefile || isNaN(imagewidth) || isNaN(imageheight)) {
      throw new Error('Invalid TSX image file found!');
    }

    const tilecount = parseInt(tileset['@_tilecount']);
    const gridsize = new Vec2D(
      imagewidth / this.tilesize.x,
      imageheight / this.tilesize.y
    );
    const tilesetObj = {
      firstgid,
      tilecount,
      gridsize,
      imagefile,
    };
    this.tilesets.set(id, tilesetObj);
    this.readAttachments(tileset['tile'], firstgid);

    // Assign each tileid a (row, col) coordinate on the tileset
    for (let tileid = firstgid; tileid < firstgid + tilecount; tileid++) {
      this.sprites.set(tileid, this.getTileImage(tileid, tilesetObj));
    }
  }

  /**
   * Read the attachments to tile objects
   *
   * @param tiles
   * @param tilesetObj
   */
  private readAttachments(tiles: any[], firstgid: number) {
    tiles.forEach((tile) => {
      const idOffset = parseInt(tile['@_id']);
      if (isNaN(idOffset)) {
        throw new Error(
          'TSX file may be corrupted! Tile does not have an `id` field'
        );
      }

      const tileid = firstgid + idOffset;
      const attachmentTypes = new Map<
        TileAttachment['type'],
        TileAttachment[]
      >();
      this.attachments.set(tileid, attachmentTypes);

      const objectgroup: any[] = tile['objectgroup'] || [];
      objectgroup.forEach((group) => {
        const objects: any[] = group['object'] || [];
        objects.forEach((object) => {
          if (!object['@_type']) {
            throw new Error(
              'TSX file may be corrupted! Tile attachment does not have a `type` field'
            );
          }
          const type = object['@_type'] as TileAttachment['type'];
          if (!attachmentTypes.has(type)) {
            attachmentTypes.set(type, []);
          }

          const x = parseInt(object['@_x']);
          const y = parseInt(object['@_y']);
          if (isNaN(x) || isNaN(y)) {
            throw new Error(
              'TSX file may be corrupted! Tile attachment does not have valid coordinate fields.'
            );
          }

          // Construct local bounding volume of the attachment
          const rect = new AABB(
            Math.round(x),
            Math.round(y),
            Math.round(parseInt(object['@_width'] || '0')),
            Math.round(parseInt(object['@_height'] || '0'))
          );

          // Read custom properties for the attachment
          const fields = new Map<string, string>();
          const propertiesContainer: any[] = object['properties'];
          if (propertiesContainer) {
            const properties: any[] = propertiesContainer[0]['property'];
            properties.forEach((property) => {
              const name = property['@_name'];
              const value = property['@_value'];
              if (name && value) {
                fields.set(name, value);
              }
            });
          }

          // Add the new attachment
          this.attachments
            .get(tileid)
            ?.get(type)
            ?.push(makeAttachment(type, rect, fields));
        });
      });
    });
  }

  /**
   * Get the GIDs of all tiles within a layer
   *
   * @param csv
   */
  private readLayer(csv: string) {
    const lines = csv.split('\n');

    const tiles = [];
    for (const line of lines) {
      const row = [];
      const split = line.split(',');
      for (const token of split) {
        if (token.length === 0) {
          continue;
        }
        row.push(parseInt(token));
      }
      tiles.push(row);
      if (row.length !== this.size.x) {
        throw new Error('Invalid layer row length!');
      }
    }
    if (tiles.length !== this.size.y) {
      throw new Error('Invalid layer height!');
    }
    return tiles;
  }

  /**
   * Generate the global navigation mesh of the map
   */
  private generateNavmesh() {
    for (let y = 0; y < this.size.y; y++) {
      const navrow = [];
      for (let x = 0; x < this.size.x; x++) {
        let isBlocked = 0;
        let stop = false;
        this.layers.forEach((layer) => {
          const gid = layer[y][x];
          const obj = this.attachments.get(gid);
          if (obj === undefined || stop) {
            return;
          }
          if (obj.has('Collider')) {
            isBlocked = 1;
            stop = true;
          }
        });
        navrow.push(isBlocked);
      }
      this.navmesh.push(navrow);
    }
  }

  /**
   * Generate the 2D map for walls (1 for wall, 0 for free space)
   */
  private generateWallmesh() {
    // Walls are only found in the foreground, so yeah.
    for (let y = 0; y < this.size.y; y++) {
      const wallrow = [];
      for (let x = 0; x < this.size.x; x++) {
        let isBlocked = 0;
        const foreground = this.layers.get('Foreground');
        if (foreground === undefined) {
          throw new Error('Fatal error generating wallmesh.');
        }

        const gid = foreground[y][x];
        const obj = this.attachments.get(gid);
        if (obj === undefined) {
          wallrow.push(isBlocked);
        } else {
          if (obj.has('Collider')) {
            isBlocked = 1;
          }
          wallrow.push(isBlocked);
        }
      }
      this.wallmesh.push(wallrow);
    }
  }

  /**
   * Generate waypoints around the navmesh for an AI to navigate around
   *
   * TODO: Create reasonable sector sizes?
   *
   * NAIVE algorithm
   *  - Single layer 2D array of 1s or 0s
   *  - For every layer on the map,
   *  -   If the tile at coordinate (x, y) contains a collider,
   *         The point at coordinate (x, y) in the navmesh is 1
   *  -   Otherwise,
   *         the point at coordinate (x, y) in the navmesh is 0
   * OPTIMIZED algorithm?
   *  -
   */
  private generateWaypoints() {
    const sectorSize = new Vec2D(5, 5);
    for (let y = 0; y < this.size.y; y += sectorSize.y) {
      for (let x = 0; x < this.size.x; x += sectorSize.x) {
        if (this.navmesh[y][x] === 0) {
          this.waypoints.push(new Vec2D(x, y));
        }
      }
    }
  }

  /**
   * Get the sprite image associated with the tile
   */
  private getTileImage(tile: Tile, tileset: Tileset) {
    const { firstgid, gridsize, imagefile } = tileset;
    const index = tile - firstgid + 1;
    const y = Math.ceil(index / gridsize.x) - 1;
    const x = index - gridsize.x * y - 1;
    return {
      x,
      y,
      imagefile,
    } as TileImage;
  }

  /**
   * Get the tile at a layer
   *
   * @param x
   * @param y
   * @param layer
   */
  getTile(x: number, y: number, layer: Layer) {
    const layerTiles = this.layers.get(layer);
    if (layerTiles === undefined) {
      return 0;
    }
    return layerTiles[y][x];
  }

  /**
   * Get the attachment at a particular grid coordinate and layer
   *
   * @param x     Tile x-coordinate
   * @param y     Tile y-coordinate
   * @param layer Layer name (e.g., foreground, background, etc.)
   * @param type  Attachment type
   */
  getAttachments<AttachmentType extends TileAttachment['type']>(
    x: number,
    y: number,
    layer: Layer,
    type: AttachmentType
  ) {
    // Get the list of attachments in world coordinates for a particular tile
    const tile = this.getTile(x, y, layer);
    if (!tile) {
      return [];
    }
    const attachments = this.attachments.get(tile)?.get(type);
    if (!attachments) {
      return [];
    }

    // Transform attachment rect to world space
    const offset = new Vec2D(x * this.tilesize.x, y * this.tilesize.y);
    const transformed: TileAttachment[] = [];
    for (const attachment of attachments) {
      const rect = attachment.rect.copy();
      rect.center = rect.center.add(offset).add(rect.dim.scale(0.5));
      transformed.push({
        ...attachment,
        rect,
      });
    }
    return transformed as NarrowAttachment<TileAttachment, AttachmentType>[];
  }

  /**
   * Get all static lights in the world
   */
  getLights() {
    const lights: Light[] = [];
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        this.layers.forEach((_, layerName) => {
          const attachments = this.getAttachments(
            x,
            y,
            layerName,
            'Light Source'
          );
          for (const attachment of attachments) {
            lights.push(
              new Light(
                attachment.rect.center.x,
                attachment.rect.center.y,
                attachment.radius,
                attachment.color,
                attachment.direction,
                attachment.halfAngle
              )
            );
          }
        });
      }
    }
    return lights;
  }

  /**
   * Get spawn location bounding volumes
   */
  getSpawns() {
    const spawns = new Map<string, AABB>();
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        const attachments = this.getAttachments(x, y, 'Background', 'Spawn');
        for (const attachment of attachments) {
          spawns.set(attachment.id, attachment.rect);
        }
      }
    }
    return spawns;
  }

  /**
   * Get exits
   */
  getExits() {
    const exits: ExitAttachment[] = [];
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        const attachments = this.getAttachments(x, y, 'Background', 'Exit');
        exits.push(...attachments);
      }
    }
    return exits;
  }

  /**
   * Get socket transferrable data for the client
   */
  getSocketData() {
    const tilesets: [string, Buffer][] = [];
    this.tilesets.forEach((tileset) => {
      const buffer = readFileSync(`${this.directory}/${tileset.imagefile}`);
      tilesets.push([tileset.imagefile, buffer]);
    });
    const attachments: [Tile, [TileAttachment['type'], TileAttachment[]][]][] =
      [];
    this.attachments.forEach((mapping, tile) => {
      attachments.push([tile, [...mapping.entries()]]);
    });
    const sprites = [...this.sprites.entries()];
    const layers = [...this.layers.entries()];

    return {
      size: this.size,
      tilesize: this.tilesize,
      tilesets,
      attachments,
      sprites,
      layers,
      outdoors: this.outdoors,
      raining: this.raining,
    } as WorldMapSocketData;
  }
}

export { TmxMap };
