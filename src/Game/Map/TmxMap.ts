import { XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import { AABB, Color, Vec2D } from 'dynamojs-engine';
import { Light } from '../World';
import { ExitAttachment, NarrowAttachment, TileAttachment } from './Attachment';
import { Layer, LayerTiles, Tile, TileImage, ClientMap, WorldMap } from './WorldMap';

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
    const target_map = fields.get('targetmap') || '.';
    const target_spawn_id = fields.get('spawn') || '0';
    return {
      type,
      rect,
      target_map,
      target_spawn_id,
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
    const half_angle = parseFloat(
      fields.get('half-angle') || '3.141592653589793'
    );
    const direction = new Vec2D(x, y).unit();
    return {
      type,
      rect,
      color,
      radius,
      half_angle,
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
class TmxMap implements WorldMap {
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
    this.parse_tmx(this.parser.parse(buffer));
  }

  /**
   * Parse the TMX file
   *
   * @param tmx
   */
  private parse_tmx(tmx: any) {
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
      this.parse_tsx(tsx, firstgid);
    });

    // Parse each layer
    const layers: any[] = map['layer'] || [];
    layers.forEach((layer) => {
      const data = layer['data'][0]['#text'];
      const name = layer['@_name'];
      this.layers.set(name as Layer, this.read_layer(data));
    });

    this.generate_navmesh();
    this.generate_wallmesh();
    this.generate_waypoints();
  }

  /**
   * Get the tiles from the tileset file
   *
   * @param tsx
   * @param firstgid
   */
  private parse_tsx(tsx: any, firstgid: number) {
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
    const gridsize = new Vec2D(imagewidth / this.tilesize.x, imageheight / this.tilesize.y);
    const tileset_obj = {
      firstgid,
      tilecount,
      gridsize,
      imagefile
    };
    this.tilesets.set(id, tileset_obj);

    const tiles: any[] = tileset['tile'] || [];
    tiles.forEach((tile) => {
      const id_offset = parseInt(tile['@_id']);
      if (isNaN(id_offset)) {
        throw new Error(
          'TSX file may be corrupted! Tile does not have an `id` field'
        );
      }

      const tileid = firstgid + id_offset;
      const attachment_types = new Map<
        TileAttachment['type'],
        TileAttachment[]
      >();
      this.attachments.set(tileid, attachment_types);
      this.sprites.set(tileid, this.get_sprite(tileid, tileset_obj));

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
          if (!attachment_types.has(type)) {
            attachment_types.set(type, []);
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
          const properties_container: any[] = object['properties'];
          if (properties_container) {
            const properties: any[] = properties_container[0]['property'];
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
  private read_layer(csv: string) {
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
  private generate_navmesh() {
    for (let y = 0; y < this.size.y; y++) {
      const navrow = [];
      for (let x = 0; x < this.size.x; x++) {
        let is_blocked = 0;
        let stop = false;
        this.layers.forEach((layer) => {
          const gid = layer[y][x];
          const obj = this.attachments.get(gid);
          if (obj === undefined || stop) {
            return;
          }
          if (obj.has('Collider')) {
            is_blocked = 1;
            stop = true;
          }
        });
        navrow.push(is_blocked);
      }
      this.navmesh.push(navrow);
    }
  }

  /**
   * Generate the 2D map for walls (1 for wall, 0 for free space)
   */
  private generate_wallmesh() {
    // Walls are only found in the foreground, so yeah.
    for (let y = 0; y < this.size.y; y++) {
      const wallrow = [];
      for (let x = 0; x < this.size.x; x++) {
        let is_blocked = 0;
        const foreground = this.layers.get('Foreground');
        if (foreground === undefined) {
          throw new Error('Fatal error generating wallmesh.');
        }

        const gid = foreground[y][x];
        const obj = this.attachments.get(gid);
        if (obj === undefined) {
          wallrow.push(is_blocked);
        } else {
          if (obj.has('Collider')) {
            is_blocked = 1;
          }
          wallrow.push(is_blocked);
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
  private generate_waypoints() {
    const sector_size = new Vec2D(5, 5);
    for (let y = 0; y < this.size.y; y += sector_size.y) {
      for (let x = 0; x < this.size.x; x += sector_size.x) {
        if (this.navmesh[y][x] === 0) {
          this.waypoints.push(new Vec2D(x, y));
        }
      }
    }
  }

  /**
   * Get the sprite image associated with the tile
   */
  private get_sprite(tile: Tile, tileset: Tileset) {
    const { firstgid, gridsize, imagefile } = tileset;
    const index = tile - firstgid + 1;
    const y = Math.ceil(index / gridsize.x) - 1;
    const x = index - gridsize.x * y - 1;
    return {
      x, y, imagefile
    } as TileImage;
  }

  /**
   * Get the tile at a layer
   *
   * @param x
   * @param y
   * @param layer
   */
  get_tile(x: number, y: number, layer: Layer) {
    const layer_tiles = this.layers.get(layer);
    if (layer_tiles === undefined) {
      return 0;
    }
    return layer_tiles[y][x];
  }

  /**
   * Get the attachment at a particular grid coordinate and layer
   *
   * @param x     Tile x-coordinate
   * @param y     Tile y-coordinate
   * @param layer Layer name (e.g., foreground, background, etc.)
   * @param type  Attachment type
   */
  get_attachments<AttachmentType extends TileAttachment['type']>(
    x: number,
    y: number,
    layer: Layer,
    type: AttachmentType
  ) {
    // Get the list of attachments in world coordinates for a particular tile
    const tile = this.get_tile(x, y, layer);
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
  get_lights() {
    const lights: Light[] = [];
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        this.layers.forEach((_, layer_name) => {
          const attachments = this.get_attachments(
            x,
            y,
            layer_name,
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
                attachment.half_angle
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
  get_spawns() {
    const spawns = new Map<string, AABB>();
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        const attachments = this.get_attachments(x, y, 'Background', 'Spawn');
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
  get_exits() {
    const exits: ExitAttachment[] = [];
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        const attachments = this.get_attachments(x, y, 'Background', 'Exit');
        exits.push(...attachments);
      }
    }
    return exits;
  }

  /**
   * Get socket transferrable data for the client
   */
  get_socket_data() {
    const tilesets = new Map<string, Buffer>();
    this.tilesets.forEach((tileset) => {
      const buffer = readFileSync(`${this.directory}/${tileset.imagefile}`);
      tilesets.set(tileset.imagefile, buffer);
    }) 
    const data: ClientMap = {
      size: this.size,
      tilesize: this.tilesize,
      tilesets,
      attachments: this.attachments,
      sprites: this.sprites,
      layers: this.layers
    };
    return data;
  }
}

export { TmxMap };
