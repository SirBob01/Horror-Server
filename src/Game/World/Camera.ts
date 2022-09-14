import { Vec2D, lerp, AABB, clamp, randrange } from 'dynamojs-engine';

/**
 * Camera class
 */
class Camera {
  private dimensions: Vec2D;
  private tilesize: Vec2D;

  private position: Vec2D;
  private target: Vec2D;

  private grid_dimensions: Vec2D;
  private world_dimensions: Vec2D;
  private current_zoom: number;
  private target_zoom: number;
  private shaking: boolean;
  private shake_intensity: number;
  private shake_duration: number;

  /**
   * Construct a new camera
   *
   * @param dimensions      Camera dimensions
   * @param grid_dimensions World dimensions in tiles
   * @param tilesize        Tile dimensions
   */
  constructor(dimensions: Vec2D, grid_dimensions: Vec2D, tilesize: Vec2D) {
    this.dimensions = dimensions.copy();
    this.tilesize = tilesize;

    this.position = new Vec2D(0, 0);
    this.target = new Vec2D(0, 0);

    this.grid_dimensions = grid_dimensions.copy();
    this.world_dimensions = grid_dimensions.copy();
    this.world_dimensions.x -= 1;
    this.world_dimensions.y -= 1;
    this.world_dimensions.x *= tilesize.x;
    this.world_dimensions.y *= tilesize.y;

    this.current_zoom = 1;
    this.target_zoom = 2;

    this.shaking = false;
    this.shake_intensity = 0;
    this.shake_duration = 0;
  }

  /**
   * Get the camera's current position
   */
  get_position() {
    return this.position;
  }

  /**
   * Get the camera's world dimensions
   */
  get_dimensions() {
    return this.dimensions;
  }

  /**
   * Get the current zoom level of the camera
   */
  get_zoom() {
    return this.current_zoom;
  }

  /**
   * Set the dimensions of the camera
   *
   * @param width
   * @param height
   */
  set_size(width: number, height: number) {
    this.dimensions.x = width;
    this.dimensions.y = height;
  }

  /**
   * Set the world position of the camera
   *
   * @param pos
   */
  set_position(pos: Vec2D) {
    this.position = pos.copy();
  }

  /**
   * Set the target position of the camera
   *
   * @param pos
   */
  set_target(pos: Vec2D) {
    this.target = pos.copy();
  }

  /**
   * Set the target zoom of the camera
   *
   * @param zoom
   */
  set_zoom(zoom: number) {
    this.target_zoom = zoom;
  }

  /**
   * Transform a world bounding volume to be relative to the camera
   *
   * @param world_box
   */
  transform(world_box: AABB) {
    const transform = world_box.copy();
    transform.center = transform.center
      .sub(this.position)
      .scale(this.current_zoom)
      .add(this.dimensions.scale(0.5));
    transform.dim = transform.dim.scale(this.current_zoom);
    return transform;
  }

  /**
   * Transform a world coordinate to be relative to the camera
   *
   * @param world_point
   */
  transform_point(world_point: Vec2D) {
    return world_point
      .sub(this.position)
      .scale(this.current_zoom)
      .add(this.dimensions.scale(0.5));
  }

  /**
   * Get the world minimum and maximum of the camera
   */
  bounds() {
    const dimensions = this.dimensions.scale(1 / (2 * this.current_zoom));
    const min = this.position.sub(dimensions);
    const max = this.position.add(dimensions);

    min.x = clamp(
      Math.floor(min.x / this.tilesize.x) - 1,
      0,
      this.grid_dimensions.x
    );
    min.y = clamp(
      Math.floor(min.y / this.tilesize.y) - 1,
      0,
      this.grid_dimensions.y
    );
    max.x = clamp(
      Math.ceil(max.x / this.tilesize.x) + 1,
      0,
      this.grid_dimensions.x
    );
    max.y = clamp(
      Math.ceil(max.y / this.tilesize.y) + 1,
      0,
      this.grid_dimensions.y
    );
    return {
      min: min,
      max: max,
    };
  }

  /**
   * Clamp the camera position so it does not go out of bounds of the world
   */
  clamp() {
    const min = this.dimensions.scale(1 / (2 * this.current_zoom));
    const max = this.world_dimensions.sub(min);

    if (this.world_dimensions.x * this.current_zoom > this.dimensions.x) {
      this.position.x = clamp(this.position.x, min.x, max.x);
    }
    if (this.world_dimensions.y * this.current_zoom > this.dimensions.y) {
      this.position.y = clamp(this.position.y, min.y, max.y);
    }
  }

  /**
   * Shake the camera for effect
   *
   * @param intensity Intensity of the shake
   * @param duration  Duration in milliseconds
   */
  shake(intensity: number, duration: number) {
    this.shaking = true;
    this.shake_intensity = intensity;
    this.shake_duration = duration;
  }

  /**
   * Update tick
   *
   * Handles interpolating positions for smooth camera motion towards some target position
   *
   * @param dt
   */
  update(dt: number) {
    const disp = this.position.sub(this.target);
    const blend = (5.0 * dt) / 1000;
    const pos_eps = 0.5;
    const zoom_eps = 0.005;

    if (Math.abs(disp.x) < pos_eps && Math.abs(disp.y) < pos_eps) {
      this.position = this.target;
    } else {
      this.position = this.position.scale(1 - blend);
      this.position = this.position.add(this.target.scale(blend));
    }

    if (Math.abs(this.target_zoom - this.current_zoom) < zoom_eps) {
      this.current_zoom = this.target_zoom;
    } else {
      this.current_zoom = lerp(this.current_zoom, this.target_zoom, blend);
    }

    if (this.shaking) {
      const offset = new Vec2D(randrange(-1, 1), randrange(-1, 1));
      this.position = this.position.add(offset.scale(this.shake_intensity));
      this.shake_duration -= dt;
      if (this.shake_duration <= 0) {
        this.shake_duration = 0;
        this.shaking = false;
      }
    }
  }
}

export { Camera };
