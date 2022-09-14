import { Socket } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '../SocketTypes';
import { Game } from './Game';

/**
 * Defines the keyboard input data format from the client
 */
interface KeyInputData {
  /**
   * Key code
   */
  key: string;

  /**
   * Pressed or released?
   */
  pressed: boolean;
}

/**
 * Defines the mouse input data format from the client
 */
interface MouseInputData {
  /**
   * Mouse0 - Left mouse
   * Mouse1 - Middle mouse
   * Mouse2 - Right mouse
   */
  button: number;

  /**
   * Pressed or released?
   */
  pressed: boolean;
}

/**
 * Generate a random name from the name word bank
 *
 * @returns new name
 */
function generate_random_name() {
  const names = [
    'Dynamo',
    'Iron',
    'Spider',
    'Proto',
    'Neutron',
    'Star',
    'Saber',
    'Optimal',
    'Mega',
    'Zord',
    'Fighter',
    'Scout',
    'Master',
    'Padawan',
    'Wing',
    'Plasmic',
    'Sonic',
    'Transformer',
    'Bot',
    'Robot',
    'Man',
    'Core',
    'Figure',
    'Actor',
  ];
  const n1 = Math.floor(Math.random() * names.length);
  const n2 = Math.floor(Math.random() * names.length);
  return names[n1] + names[n2];
}

/**
 * Represents a player in the game
 */
class Player {
  socket: Socket<ClientToServerEvents, ServerToClientEvents>;

  game: Game | null;

  name: string;

  resources: number;

  constructor(socket: Socket<ClientToServerEvents, ServerToClientEvents>) {
    this.socket = socket;
    this.game = null;

    this.name = generate_random_name();
    this.resources = 0;
  }

  /**
   * Handle mouse input
   *
   * @param mousedata
   */
  public handle_mouse(mousedata: MouseInputData) {}

  /**
   * Handle keyboard input
   * @param keydata
   */
  public handle_keys(keydata: KeyInputData) {}
}

export { Player };
export type { KeyInputData, MouseInputData };
