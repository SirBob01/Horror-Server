import { Vec2D } from 'dynamojs-engine';
import { Socket } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '../SocketTypes';
import { Player } from './Player';
import { World } from './World';

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
  playerId: string;
  playerName: string;
}

/**
 * Data sent when the game is started
 */
interface StartData {
  key: string;
  mapSize: Vec2D;
}

/**
 * Data sent for each entity
 */
interface EntityData {
  type: string;
  ownerId: string | null;
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

  worlds: Map<string, World>;

  constructor(key: string, host: Socket) {
    this.key = key;
    this.host = host;
    this.players = [];
    this.running = false;
    this.last_disconnect = Date.now();

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
      const playerId = this.players[i].socket.id;
      if (playerId === id) {
        this.players[i].game = null;
        this.players.splice(i, 1);
        if (playerId === this.host.id) {
          new_host = true;
        }
        break;
      }
    }

    // TODO: Delete entities owned by that player

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
        playerId: player.socket.id,
        playerName: player.name,
      };
      player.socket.emit('lobby', data);
    }
  }

  /**
   * Randomly generate the planets, asteroids, and stars of this map
   */
  public generate() {}

  /**
   * Send initial data to member players
   */
  public send_start_data() {
    this.players.forEach((player) => {
      // player.socket.emit('start', {
      //   // TODO
      //   key: this.key
      // });
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
