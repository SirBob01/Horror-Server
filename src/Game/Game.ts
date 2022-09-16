import { Socket } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '../SocketTypes';
import { Player } from './Player';
import { World } from './World';
import { ClientMap, TmxMap } from './Map';
import { Human } from './Entity';

/**
 * Defines the necessary data for the client to store player information
 */
interface LobbyPlayer {
  id: string;
  name: string;
  host: boolean;
}

/**
 * Data sent on lobby initialization
 */
interface LobbyData {
  players: LobbyPlayer[];
  player_id: string;
  player_name: string;
}

/**
 * Data sent when the game is started
 */
interface StartData {
  key: string;
  map_data: ClientMap;
}

/**
 * Data sent for each entity
 */
interface EntityData {
  type: string;
  owner_id: string | null;
}

/**
 * Live game state information
 */
interface GameStateData {
  entities: EntityData[];
}

/**
 * Runs the simulation logic for an individual game
 */
class Game {
  key: string;
  host: Socket<ClientToServerEvents, ServerToClientEvents>;
  players: Player[];
  running: boolean;
  last_disconnect: number;
  initial_map: string;

  worlds: Map<string, World>;

  constructor(key: string, host: Socket) {
    this.key = key;
    this.host = host;
    this.players = [];
    this.running = false;
    this.last_disconnect = Date.now();
    this.initial_map = 'TestMap.tmx';

    this.worlds = new Map();

    this.handle_host_input();
  }

  /**
   * Handle host input
   */
  public handle_host_input() {
    this.host.on('start', () => {
      if (!this.running) {
        this.generate();
        this.send_start_data();
        this.running = true;
      }
    });
    this.host.on('stop', () => {
      this.running = false;
    });
  }

  /**
   * Let a new player join
   *
   * @param player
   */
  public join(player: Player) {
    this.players.push(player);
    player.game = this;
  }

  /**
   * Disconnect a player
   *
   * @param id
   */
  public disconnect(id: string) {
    let new_host = false;

    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];

      if (player.socket.id === id) {
        this.players.splice(i, 1);
        player.game = null;
        this.worlds.forEach((world) => {
          if (player.entity) {
            world.remove_entity(player.entity);
          }
        });

        // This guy was the host, so now we need a new one
        if (player.socket.id === this.host.id) {
          new_host = true;
        }
        break;
      }
    }

    // Host left, get a new host
    if (new_host && this.players.length) {
      this.host = this.players[0].socket;
      this.handle_host_input();
    }

    this.last_disconnect = Date.now();
  }

  /**
   * Send lobby information to the players
   */
  public send_lobby_data() {
    const players: LobbyPlayer[] = this.players.map((player) => {
      return {
        id: player.socket.id,
        name: player.name,
        host: player.socket.id === this.host.id,
      };
    });
    for (const player of this.players) {
      const data: LobbyData = {
        players,
        player_id: player.socket.id,
        player_name: player.name,
      };
      player.socket.emit('lobby', data);
    }
  }

  /**
   * Generate all the maps for the current game starting from the initial map
   */
  public generate() {
    const prefix = './maps/test_map/';

    const visited = new Set<string>();
    const queue = [this.initial_map];
    while (queue.length) {
      const file = queue.pop();
      if (!file || file === '.') continue;

      const map = new TmxMap(prefix + file);
      const world = new World(map, (entity, target_map, target_spawn) => {
        const next_world = this.worlds.get(target_map);
        if (!next_world) return;
  
        const next_spawn = next_world.map.get_spawns().get(target_spawn);
        if (!next_spawn) return;
  
        entity.center.x = next_spawn.center.x;
        entity.center.y = next_spawn.center.y;
        next_world.add_entity(entity);
        this.players.find((player) => {
          player
        })
      });
      this.worlds.set(file, world);

      // Look into neighboring maps
      for (const { target_map } of map.get_exits()) {
        if (!visited.has(target_map)) {
          queue.push(target_map);
        }
      }
    }

    // Associate each player with an entity and add them to the world
    this.players.forEach((player) => {
      const initial_world = this.worlds.get(this.initial_map);
      if (!initial_world) return;

      const initial_spawn = initial_world.map.get_spawns().get('0');
      if (!initial_spawn) return;

      player.entity = new Human(initial_spawn.center.x, initial_spawn.center.y);
      initial_world.add_entity(player.entity);
    });
  }

  /**
   * Send initial data to member players
   */
  public send_start_data() {
    const key = this.key;
    this.players.forEach((player) => {
      const map = this.worlds.get(this.initial_map)?.map;
      if (!map) return;

      const map_data = map.get_socket_data();
      player.socket.emit('start', { key, map_data });
    });
  }

  /**
   * Broadcast players the relevant game state
   */
  public broadcast() {
    this.players.forEach((player) => {
      // player.socket.emit('broadcast', {
      //   // TODO
      // });
    });
  }

  /**
   * Update simulation state per frame
   *
   * @param delta (ms)
   */
  public update(delta: number) {
    this.worlds.forEach((world) => {
      world.update(delta);
    });
  }
}

export { Game };
export type { LobbyPlayer, LobbyData, StartData, EntityData, GameStateData };
