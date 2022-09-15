/// This file defines all the necessary types for the communication between the client and server.
import {
  KeyInputData,
  MouseInputData,
  LobbyPlayer,
  LobbyData,
  StartData,
  EntityData,
  GameStateData,
} from './Game';

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
  keystate: (input: KeyInputData) => void;

  /**
   * Handle mouse input
   */
  mousestate: (input: MouseInputData) => void;

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
  lobby: (data: LobbyData) => void;

  /**
   * Emit the initial start data to the players
   */
  start: (data: StartData) => void;

  /**
   * Live broadcast live game state information to the players
   */
  broadcast: (state: GameStateData) => void;

  /**
   * Kick a player
   */
  kick: () => void;
}

export type {
  ClientToServerEvents,
  ServerToClientEvents,
  KeyInputData,
  MouseInputData,
  LobbyPlayer,
  LobbyData,
  StartData,
  EntityData,
  GameStateData,
};
