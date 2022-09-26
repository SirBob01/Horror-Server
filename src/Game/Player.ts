import { Socket } from 'socket.io';
import { Game } from './Game';
import {
  ClientToServerEvents,
  Controllable,
  Entity,
  ServerToClientEvents,
  World,
} from 'horror-simulation';

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
  name: string;
  last_seq: number;

  game: Game | null;
  entity: (Entity & Controllable) | null;
  world: World | null;

  constructor(socket: Socket<ClientToServerEvents, ServerToClientEvents>) {
    this.name = generate_random_name();
    this.socket = socket;
    this.last_seq = 0;

    this.game = null;
    this.entity = null;
    this.world = null;
  }
}

export { Player };
