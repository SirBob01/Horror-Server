import { Game } from './Game';
import {
  NetworkChannels,
  ClientToServerEvents,
  ServerToClientEvents,
  Controllable,
  Entity,
  InputEvent,
  World,
} from 'horror-simulation';
import Connection from 'dynamojs-net';

/**
 * Generate a random name from the name word bank
 *
 * @returns new name
 */
function generateRandomName() {
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
  id: string;
  connection: Connection<
    NetworkChannels,
    ClientToServerEvents,
    ServerToClientEvents
  >;

  name: string;
  inputEvents: InputEvent[];
  lastSeq: number;

  game: Game | null;
  entity: (Entity & Controllable) | null;
  world: World | null;

  constructor(
    id: string,
    connection: Connection<
      NetworkChannels,
      ClientToServerEvents,
      ServerToClientEvents
    >
  ) {
    this.id = id;
    this.connection = connection;

    this.name = generateRandomName();
    this.inputEvents = [];
    this.lastSeq = 0;

    this.game = null;
    this.entity = null;
    this.world = null;
  }
}

export { Player };
