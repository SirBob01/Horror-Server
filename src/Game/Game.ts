import { randrange } from 'dynamojs-engine';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  World,
  PlayerSocketData,
  LobbySocketData,
  ServerMap,
  Human,
  Monster,
} from 'horror-simulation';
import { Socket } from 'socket.io';
import { Player } from './Player';
import { TmxMap } from './TmxMap';

/**
 * Runs the simulation logic for an individual game
 */
class Game {
  key: string;
  host: Socket<ClientToServerEvents, ServerToClientEvents>;
  players: Player[];
  running: boolean;
  last_disconnect: number;
  state_seq: number;
  initial_map: string;

  worlds: Map<string, World>;

  constructor(key: string, host: Socket) {
    this.key = key;
    this.host = host;
    this.players = [];
    this.running = false;
    this.last_disconnect = Date.now();
    this.state_seq = 0;
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
    const players: PlayerSocketData[] = this.players.map((player) => {
      return {
        id: player.socket.id,
        name: player.name,
        host: player.socket.id === this.host.id,
      };
    });
    for (const player of this.players) {
      const data: LobbySocketData = {
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

        // Signal to the relevant player to transition maps
        const player = this.players.find((player) => player.entity === entity);
        const map_data = (next_world.map as ServerMap).get_socket_data();
        player?.socket.emit('map_transition', {
          map_data,
          target_spawn,
        });
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
    const monster_index = Math.floor(randrange(0, this.players.length));
    this.players.forEach((player, index) => {
      const initial_world = this.worlds.get(this.initial_map);
      if (!initial_world) return;

      const initial_spawn = initial_world.map.get_spawns().get('0');
      if (!initial_spawn) return;

      if (monster_index === index) {
        player.entity = new Monster(initial_spawn.center.x, initial_spawn.center.y);
      } else {
        player.entity = new Human(initial_spawn.center.x, initial_spawn.center.y);
      }
      player.world = initial_world;
      initial_world.add_entity(player.entity);
    });
  }

  /**
   * Send initial data to member players
   */
  public send_start_data() {
    const key = this.key;
    this.players.forEach((player) => {
      const map = this.worlds.get(this.initial_map)?.map as ServerMap;
      if (!map) return;

      const map_data = map.get_socket_data();
      player.socket.emit('start', { key, map_data });
    });
  }

  /**
   * Broadcast players the relevant game state
   */
  public broadcast() {
    this.state_seq++;
    this.players.forEach((player) => {
      if (!player.world || !player.entity) return;
      player.socket.volatile.emit(
        'broadcast',
        player.world.get_socket_data(player.entity.id, this.state_seq)
      );
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
