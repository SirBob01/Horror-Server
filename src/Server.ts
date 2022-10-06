import WebSocket from 'ws';
import Connection from 'dynamojs-net';
import { v4 as uuid } from 'uuid';
import { Game, Player } from './Game';
import ServerSignaler from './ServerSignaler';
import {
  NetworkChannels,
  channelConfigs,
  ClientToServerEvents,
  ServerToClientEvents,
} from 'horror-simulation';

/**
 * Generate a random string of a certain length
 *
 * @param length Length of the random string
 * @returns
 */
const generateRandomString = (length: number) => {
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  for (let i = 0; i < length; i++) {
    string += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return string;
};

class Server {
  private players: Map<string, Player>;
  private games: Map<string, Game>;

  /**
   * Server instance that coordinates the simulation of multiple concurrent games
   */
  constructor(wss: WebSocket.Server) {
    this.players = new Map();
    this.games = new Map(); // Users are grouped into lobbies that play games

    // WebSocket server to facilitate the WebRTC signaling process
    wss.on('connection', (socket) => {
      const signaler = new ServerSignaler(socket);
      Connection.createRecv<
        NetworkChannels,
        ClientToServerEvents,
        ServerToClientEvents
      >(signaler, {
        iceServers: [
          { urls: 'stun:stun.stunprotocol.org:3478' },
          { urls: 'stun:stun.l.google.com:19302' },
        ],
        channels: channelConfigs,
      })
        .then((connection) => {
          const id = uuid();
          const player = new Player(id, connection);
          this.players.set(id, player);

          // Create a new lobby
          connection.on('admin', 'create', () => {
            const keylen = 6;
            let key = generateRandomString(keylen);
            while (key in this.games) {
              key = generateRandomString(keylen);
            }
            const game = new Game(key, player);
            game.join(player);
            game.sendLobbyData();
            this.games.set(key, game);

            // Share the key with friends to join lobby
            connection.emit('admin', 'createResponse', key);
          });

          // Join an existing game
          connection.on('admin', 'join', (key) => {
            const game = this.games.get(key);
            if (game && !game.running) {
              const joined = game.players
                .map((player) => player.id)
                .includes(id);
              if (!joined) game.join(player);
              game.sendLobbyData();
              connection.emit('admin', 'joinResponse', true);
            } else {
              connection.emit('admin', 'joinResponse', false);
            }
          });

          // Set player name
          connection.on('admin', 'setName', (name) => {
            player.name = name;
            player.game?.sendLobbyData();
          });

          // Kicking a player
          connection.on('admin', 'kick', (id) => {
            const target = this.players.get(id);
            if (target && target.game) {
              const game = target.game;
              game.disconnect(id);
              game.sendLobbyData();
              target.connection.emit('admin', 'kick');
            }
          });

          // Handle disconnect
          connection.addDisconnectHandler(() => {
            if (player.game) {
              const game = player.game;
              game.disconnect(id);
              game.sendLobbyData();
            }
            this.players.delete(id);
          });
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    });
  }

  /**
   * Broadcast the game data to its member players
   */
  broadcast() {
    this.games.forEach((game) => {
      if (game.running) {
        game.broadcast();
      }
    });
  }

  /**
   * Execute simulation logic
   *
   * @param delta {ms}
   */
  update(delta: number) {
    this.games.forEach((game, key) => {
      // A non-running game can exist for up to 1 hour after everyone has left
      if (
        game.players.length === 0 &&
        (game.running || Date.now() - game.lastDisconnect > 1000 * 60 * 60)
      ) {
        this.games.delete(key);
      } else if (game.running) {
        game.update(delta);
      }
    });
  }
}

export { Server };
