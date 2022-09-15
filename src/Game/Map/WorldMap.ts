import { AABB, Vec2D } from 'dynamojs-engine';
import { Light } from '../World';
import {
  NarrowAttachment,
  SpawnAttachment,
  TileAttachment,
} from './Attachment';

/**
 * List of all map layers
 */
const MapLayers = [
  'Floor',
  'FloorItems',
  'Background',
  'Midground',
  'Foreground',
] as const;

/**
 * Enumerates all map layer types
 */
type Layer = typeof MapLayers[number];

/**
 * Unique identifer for a tile
 */
type Tile = number;

/**
 * WorldMap interface
 */
interface WorldMap {
  /**
   * Size of the map (in tiles)
   */
  size: Vec2D;

  /**
   * Size of an individual tile
   */
  tilesize: Vec2D;

  /**
   * Map of all colliders on the map
   */
  wallmesh: number[][];

  /**
   * Get the navigation points for AI
   */
  navmesh: number[][];

  /**
   * Get the list of landmark points that an AI may want to travel to
   */
  waypoints: Vec2D[];

  /**
   * Is the map outdoors?
   */
  outdoors: boolean;

  /**
   * Is the weather raining?
   */
  raining: boolean;

  /**
   * Get the tile located at a layer
   *
   * @param x
   * @param y
   * @param layer
   */
  get_tile(x: number, y: number, layer: Layer): Tile;

  /**
   * Get the list of attachments for a given tile
   *
   * @param x
   * @param y
   * @param layer
   * @param type
   */
  get_attachments<AttachmentType extends TileAttachment['type']>(
    x: number,
    y: number,
    layer: Layer,
    type: AttachmentType
  ): NarrowAttachment<TileAttachment, AttachmentType>[];

  /**
   * Get all spawns on the map
   */
  get_spawns(): Map<SpawnAttachment['id'], AABB>;

  /**
   * Get all lights on the map
   */
  get_lights(): Light[];
}

export { MapLayers };
export type { WorldMap, Layer, Tile };
