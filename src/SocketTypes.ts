/// This file defines all the necessary types for the communication between the client and server.
import {
  KeyInputSocketData,
  MouseInputSocketData,
} from './Game';
import { Entity, Particle, Light, Sound, WorldMapSocketData } from './Game';

/**
 * Defines the necessary data for the client to store player information
 */
 interface PlayerSocketData {
  id: string;
  name: string;
  host: boolean;
}

/**
 * Sent on lobby initialization
 */
interface LobbySocketData {
  players: PlayerSocketData[];
  player_id: string;
  player_name: string;
}

/**
 * Sent when the game is started
 */
interface StartSocketData {
  key: string;
  map_data: WorldMapSocketData;
}

/**
 * Live game state information
 */
interface GameStateSocketData {
  entities: Entity[];
  particles: Particle[];
  sounds: Sound[];
  lights: Light[];
}

/**
 * Client-to-server events
 */
interface ClientToServerEvents {
  /**
   * Create a new lobby
   */
  create: (callback: (key: string) => void) => void;

  /**
   * Join an existing lobby
   */
  join: (key: string, callback: (success: boolean) => void) => void;

  /**
   * Set the name of a player
   */
  setname: (name: string) => void;

  /**
   * Name of the map to be played
   */
  setmap: (name: string) => void;

  /**
   * Start a game
   */
  start: () => void;

  /**
   * Stop a game
   */
  stop: () => void;

  /**
   * Handle keyboard input
   */
  keystate: (input: KeyInputSocketData) => void;

  /**
   * Handle mouse input
   */
  mousestate: (input: MouseInputSocketData) => void;

  /**
   * Kick a player
   */
  kick: (id: string) => void;
}

/**
 * Server-to-client events
 */
interface ServerToClientEvents {
  /**
   * Emit lobby information to the players
   */
  lobby: (data: LobbySocketData) => void;

  /**
   * Emit the initial start data to the players
   */
  start: (data: StartSocketData) => void;

  /**
   * Live broadcast live game state information to the players
   */
  broadcast: (state: GameStateSocketData) => void;

  /**
   * Kick a player
   */
  kick: () => void;
}

export * from './Game';
export type {
  ClientToServerEvents,
  ServerToClientEvents,
  KeyInputSocketData,
  MouseInputSocketData,
  PlayerSocketData,
  LobbySocketData,
  StartSocketData,
  GameStateSocketData,
};
