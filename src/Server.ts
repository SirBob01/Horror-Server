import { Server as SocketServer } from 'socket.io';
import http from 'http';
import { Game, Player } from './Game';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ClientToServerEvents, ServerToClientEvents } from './SocketTypes';

/**
 * Generate a random string of a certain length
 *
 * @param length Length of the random string
 * @returns
 */
const generate_random_string = (length: number) => {
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  for (let i = 0; i < length; i++) {
    string += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return string;
};

class Server {
  private io: SocketServer<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap
  >;

  private players: Map<string, Player>;

  private games: Map<string, Game>;

  /**
   * Server instance that coordinates the simulation of multiple concurrent games
   */
  constructor(server: http.Server) {
    this.io = new SocketServer(server, {
      cors: {
        origin: '*',
      },
    });
    this.players = new Map();
    this.games = new Map(); // Users are grouped into lobbies that play games

    // Handle the initial connection
    this.io.on('connection', (socket) => {
      const player = new Player(socket);
      this.players.set(socket.id, player);

      // Create a new lobby
      socket.on('create', (callback) => {
        const keylen = 6;
        let key = generate_random_string(keylen);
        while (key in this.games) {
          key = generate_random_string(keylen);
        }
        const game = new Game(key, player.socket);
        game.join(player);
        game.send_lobby_data();
        this.games.set(key, game);

        // Share the key with friends to join lobby
        callback(key);
      });

      // Join an existing game
      socket.on('join', (key, callback) => {
        const game = this.games.get(key);
        if (game && !game.running) {
          const joined = game.players
            .map((player) => player.socket.id)
            .includes(socket.id);
          if (!joined) game.join(player);
          game.send_lobby_data();
          callback(true);
        } else {
          callback(false);
        }
      });

      // Set player name
      socket.on('setname', (name) => {
        player.name = name;
        player.game?.send_lobby_data();
      });

      // Handle key input
      socket.on('keystate', player.handle_keys);

      // Handle mouse input
      socket.on('mousestate', player.handle_mouse);

      // Kicking a player
      socket.on('kick', (id) => {
        const target = this.players.get(id);
        if (target && target.game) {
          const game = target.game;
          game.disconnect(id);
          game.send_lobby_data();
          target.socket.emit('kick');
        }
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        if (player.game) {
          const game = player.game;
          game.disconnect(socket.id);
          game.send_lobby_data();
        }
        this.players.delete(socket.id);
      });
    });
  }

  /**
   * Broadcast the game data to its member players
   */
  public broadcast() {
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
  public update(delta: number) {
    this.games.forEach((game, key) => {
      // A game can exist for up to 1 hour after everyone has left
      if (
        game.players.length === 0 &&
        Date.now() - game.last_disconnect > 1000 * 60 * 60
      ) {
        this.games.delete(key);
      } else if (game.running) {
        game.update(delta);
      }
    });
  }
}

export { Server };
