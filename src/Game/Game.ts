import { Vec2D } from 'dynamojs-engine';
import { Socket } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '../SocketTypes';
import { Player } from './Player';

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
  size: number;
  mass: number;
  health: number;
  center: Vec2D;
  vel: Vec2D;
  acc: Vec2D;
  angle: number;
  angularVel: number;
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
  // Unique key associated with the game
  key: string;

  // Host player socket
  host: Socket<ClientToServerEvents, ServerToClientEvents>;

  // List of players in this game
  players: Map<string, Player>;

  // Is running?
  running: boolean;

  // Timestamp for last time a player disconnected
  last_disconnect: number;

  constructor(key: string, host: Socket) {
    this.key = key;
    this.host = host;
    this.players = new Map();
    this.running = false;
    this.last_disconnect = Date.now();

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
  public join(id: string, player: Player) {
    this.players.set(id, player);
    player.game = this;
  }

  /**
   * Disconnect a player
   *
   * @param id
   */
  public disconnect(id: string) {
    let newHost = false;
    for (let i = 0; i < this.players.length; i++) {
      const playerId = this.players[i].socket.id;
      if (playerId === id) {
        this.players[i].game = null;
        this.players.splice(i, 1);
        if (playerId === this.host.id) {
          newHost = true;
        }
        break;
      }
    }

    // Delete entities owned by that player
    for (let i = this.entities.length - 1; i >= 0; i--) {
      const entity = this.entities[i];
      if (entity.ownerId === id) this.entities.splice(i, 1);
    }

    // Host left, get a new host
    if (newHost && this.players.length > 0) {
      this.host = this.players[0].socket;
      this.handleHostInput();
    }

    this.lastDisconnect = Date.now();
  }

  /**
   * Send lobby information to the players
   */
  public sendLobbyData() {
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
  public generate() {
    this.mapSize = new Vec2D(2000, 2000).scale(this.players.length);

    // TODO: Randomly allocate each player a sector
    // Ensure assigned sectors are evenly spaced
    const sectors = Math.pow(this.players.length, 2);

    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      this.entities.push(
        new Ship(
          100 + Math.random() * 300,
          100 + Math.random() * 300,
          player.socket.id,
          0,
          'scout'
        )
      );
    }
  }

  /**
   * Send initial data to member players
   */
  public send_start_data() {
    for (const player of this.players) {
      player.socket.emit('start', {
        key: this.key,
      });
    }
  }

  /**
   * Broadcast players the relevant game state
   */
  public broadcast() {
    for (const player of this.players) {
      player.socket.emit('broadcast', {
        entities: this.entities.map((e) => {
          return {
            type: e.constructor.name,
            ...e,
          };
        }),
      });
    }
  }

  /**
   * Update simulation state per frame
   *
   * @param delta (ms)
   */
  public update(delta: number) {

  }
}

export { Game };
export type { LobbyPlayer, LobbyData, StartData, EntityData, GameStateData };
