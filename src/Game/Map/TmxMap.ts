import { AABB, Color, Sprite, Surface, Vec2D } from 'dynamojs-engine';
import { Light } from '../World';
import { NarrowAttachment, TileAttachment } from './Attachment';
import { Layer, Tile, WorldMap } from './WorldMap';

/**
 * 2D array of tile GIDs within a layer
 */
type LayerTiles = Tile[][];

/**
 * Meta data for a tileset
 */
interface Tileset {
  /**
   * 2D grid of surface tiles to index from
   */
  sprites: Surface[][];

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
class TmxMap implements WorldMap {
  private directory: string;

  private tilesets: Map<string, Tileset>;

  private attachments: Map<Tile, Map<TileAttachment['type'], TileAttachment[]>>;

  public layers: Map<Layer, LayerTiles>;

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
  constructor(file: string, onload: (map: WorldMap) => void) {
    this.directory = file.split('/').slice(0, -1).join('/');

    this.layers = new Map(); // Tilemap layers
    this.attachments = new Map(); // All tile-specific attachments
    this.size = new Vec2D(0, 0);

    this.tilesets = new Map();
    this.tilesize = new Vec2D(0, 0);

    this.navmesh = [];
    this.wallmesh = [];
    this.waypoints = [];
    this.outdoors = false;
    this.raining = true;

    this.load_xml(file).then(async (xml: XMLDocument) => {
      await this.parse_tmx(xml);
      onload(this);
    });
  }

  /**
   * Download an XML file
   *
   * @param file
   */
  private load_xml(file: string) {
    return new Promise((resolve: (xml: XMLDocument) => void) => {
      const request = new XMLHttpRequest();
      request.overrideMimeType('text/xml');
      request.onreadystatechange = function () {
        if (
          request.status === 200 &&
          request.readyState === 4 &&
          request.responseXML
        ) {
          resolve(request.responseXML);
        } else if (request.status === 404) {
          throw new Error('Unable to load XML file ' + file + '.');
        }
      };
      request.open('GET', file, false);
      request.send();
    });
  }

  /**
   * Parse the TMX file
   *
   * @param xml
   */
  private async parse_tmx(xml: XMLDocument) {
    const header = xml.getElementsByTagName('map')[0];
    const properties = header.getElementsByTagName('properties')[0];
    const tilesets = xml.getElementsByTagName('tileset');
    const layers = xml.getElementsByTagName('layer');

    // Read map properties
    if (properties) {
      for (const prop of properties.children) {
        if (prop.getAttribute('name') === 'Outdoors') {
          this.outdoors = prop.getAttribute('value') === 'true';
        }
      }
    }

    // Tile dimensions
    const tilewidth = header.getAttribute('tilewidth');
    const tileheight = header.getAttribute('tileheight');
    if (tilewidth === null || tileheight === null) {
      throw new Error('Invalid tile dimensions!');
    }
    this.tilesize = new Vec2D(parseInt(tilewidth), parseInt(tileheight));

    // Grid size
    const width = header.getAttribute('width');
    const height = header.getAttribute('height');
    if (width === null || height === null) {
      throw new Error('Invalid map dimensions!');
    }
    this.size = new Vec2D(parseInt(width), parseInt(height));

    // Load tilesets from external files
    for (let i = 0; i < tilesets.length; i++) {
      const file = tilesets[i].getAttribute('source');
      const gid = tilesets[i].getAttribute('firstgid');

      let tileset_root;
      if (file !== null) {
        const tileset_xml = await this.load_xml(this.directory + '/' + file);
        tileset_root = tileset_xml.getElementsByTagName('tileset')[0];
      } else {
        tileset_root = tilesets[i];
      }

      if (gid === null) {
        throw new Error('TMX file may be corrupted! `firstgid` not found.');
      }
      this.read_tileset(tileset_root, parseInt(gid));
    }

    // Load each layer
    for (let i = 0; i < layers.length; i++) {
      const data = layers[i].getElementsByTagName('data')[0];
      const name = layers[i].getAttribute('name');
      if (name && data.childNodes[0].nodeValue) {
        this.layers.set(
          name as Layer,
          this.read_layer(data.childNodes[0].nodeValue)
        );
      }
    }
    this.generate_navmesh();
    this.generate_wallmesh();
    this.generate_waypoints();
  }

  /**
   * Get the attachments from the tileset file
   *
   * @param tileset
   * @param firstgid
   */
  private read_attachments(tileset: Element, firstgid: number) {
    const tilemeta = tileset.getElementsByTagName('tile');

    for (let i = 0; i < tilemeta.length; i++) {
      const id_field = tilemeta[i].getAttribute('id');
      if (id_field === null) {
        throw new Error(
          'TSX file may be corrupted! Tile does not have an `id` field'
        );
      }
      const tile = parseInt(id_field) + firstgid;
      const attachment_types = new Map<
        TileAttachment['type'],
        TileAttachment[]
      >();
      this.attachments.set(tile, attachment_types);

      const attachments_field = tilemeta[i].getElementsByTagName('object');
      for (let j = 0; j < attachments_field.length; j++) {
        const attachment_field = attachments_field[j];
        const type_field = attachment_field.getAttribute('type');
        if (type_field === null) {
          throw new Error(
            'TSX file may be corrupted! Tile attachment does not have a `type` field.'
          );
        }
        const type = type_field as TileAttachment['type'];
        if (!attachment_types.has(type)) {
          attachment_types.set(type, []);
        }
        const x_field = attachment_field.getAttribute('x');
        const y_field = attachment_field.getAttribute('y');
        const width_field = attachment_field.getAttribute('width');
        const height_field = attachment_field.getAttribute('height');
        if (x_field === null || y_field === null) {
          throw new Error(
            'TSX file may be corrupted! Tile attachment does not have x, y, width, height fields.'
          );
        }

        // Generate the attachment object based on the given fields
        const rect = new AABB(
          Math.round(parseFloat(x_field || '0')),
          Math.round(parseFloat(y_field || '0')),
          Math.round(parseFloat(width_field || '0')),
          Math.round(parseFloat(height_field || '0'))
        );
        const fields = new Map<string, string>();
        const prop_list = attachment_field.getElementsByTagName('properties');
        if (prop_list.length) {
          const properties = prop_list[0].getElementsByTagName('property');
          for (let k = 0; k < properties.length; k++) {
            const key = properties[k].getAttribute('name');
            const val = properties[k].getAttribute('value');
            if (key && val) {
              fields.set(key, val);
            }
          }
        }
        this.attachments
          .get(tile)
          ?.get(type)
          ?.push(makeAttachment(type, rect, fields));
      }
    }
  }

  /**
   * Get the tiles from the tileset file
   *
   * @param tileset
   * @param firstgid
   */
  private read_tileset(tileset: Element, firstgid: number) {
    const id = tileset.getAttribute('name');
    if (id === null) {
      throw new Error('TSX file may be corrupted! `name` field not found');
    }

    const image = tileset.getElementsByTagName('image')[0];
    const imagewidth = image.getAttribute('width');
    const imageheight = image.getAttribute('height');

    if (image === null || imagewidth === null || imageheight === null) {
      throw new Error(
        'TSX file may be corrupted! Tileset image specifications not defined.'
      );
    }

    const gridwidth = Math.floor(parseInt(imagewidth) / this.tilesize.x);
    const gridheight = Math.floor(parseInt(imageheight) / this.tilesize.y);

    // The actual image file
    const sprites: Surface[][] = [];
    const source_dir = image.getAttribute('source');
    const base = new Surface(parseInt(imagewidth), parseInt(imageheight));
    new Sprite(this.directory + '/' + source_dir, 0, 0, 0, (s) => {
      base.draw_sprite(s, base.rect());
      for (let y = 0; y < gridheight; y++) {
        const row = [];
        for (let x = 0; x < gridwidth; x++) {
          row.push(
            base.subsurface(
              new AABB(
                x * this.tilesize.x,
                y * this.tilesize.y,
                this.tilesize.x,
                this.tilesize.y
              )
            )
          );
        }
        sprites.push(row);
      }
    });

    const tilecount = tileset.getAttribute('tilecount');
    if (id !== null && tilecount !== null) {
      this.tilesets.set(id, {
        firstgid,
        tilecount: parseInt(tilecount),
        gridsize: new Vec2D(gridwidth, gridheight),
        sprites,
      });
      this.read_attachments(tileset, firstgid);
    }
  }

  /**
   * Get the GIDs of all tiles within a layer
   *
   * @param csv
   */
  private read_layer(csv: string) {
    const lines = csv.split('\n');
    lines.pop();
    lines.shift();

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
   * Get the tile sprite associated with a global id
   *
   * @param tile
   */
  get_sprite(tile: Tile) {
    if (tile === 0) {
      return null;
    }

    // Find the relevant tileset
    let tileset: undefined | Tileset;
    this.tilesets.forEach((current) => {
      const lastgid = current.tilecount + current.firstgid - 1;
      if (tile <= lastgid) {
        tileset = current;
        return;
      }
    });

    // Get the image associated with the GID
    if (tileset !== undefined && tileset.sprites.length) {
      const index = tile - tileset.firstgid + 1;
      const y = Math.ceil(index / tileset.gridsize.x) - 1;
      const x = index - tileset.gridsize.x * y - 1;
      return tileset.sprites[y][x];
    } else {
      return null;
    }
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
}

export { TmxMap };
