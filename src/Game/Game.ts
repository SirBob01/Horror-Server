import { randrange } from 'dynamojs-engine';
import {
  World,
  PlayerSocketData,
  LobbySocketData,
  ServerMap,
  Human,
  Monster,
} from 'horror-simulation';
import { Player } from './Player';
import { TmxMap } from './TmxMap';

/**
 * Runs the simulation logic for an individual game
 */
class Game {
  key: string;
  initialMap: string;
  running: boolean;

  host: Player | null;
  players: Player[];
  lastDisconnect: number;

  worlds: Map<string, World>;

  constructor(key: string) {
    this.key = key;
    this.initialMap = 'TestMap.tmx';
    this.running = false;

    this.host = null;
    this.players = [];
    this.lastDisconnect = Date.now();

    this.worlds = new Map();
  }

  /**
   * Handle host input
   */
  handleHostInput() {
    this.host?.connection.on('admin', 'start', () => {
      if (!this.running) {
        this.generate();
        this.sendStartData();
        this.running = true;
      }
    });
    this.host?.connection.on('admin', 'stop', () => {
      this.running = false;
    });
  }

  /**
   * Let a new player join
   *
   * @param player
   */
  join(player: Player) {
    this.players.push(player);
    player.game = this;

    // Attach input listeners
    player.connection.on('stateReliable', 'input', (state) => {
      if (player.lastSeq < state.seq && this.running) {
        player.lastSeq = state.seq;
        player.deltaInput.push(...state.input);
      }
    });
    player.connection.on('stateUnreliable', 'input', (state) => {
      if (player.lastSeq < state.seq && this.running) {
        player.lastSeq = state.seq;
        player.liveInput.push(...state.input);
      }
    });

    if (!this.host) {
      this.host = player;
      this.handleHostInput();
    }
  }

  /**
   * Disconnect a player
   *
   * @param id
   */
  disconnect(id: string) {
    const index = this.players.findIndex((player) => player.id === id);
    if (index < 0) return;

    // Remove the player entity from the world
    const player = this.players[index];
    if (player.world && player.entity) {
      player.world.removeEntity(player.entity);
    }
    this.players.splice(index, 1);

    // Detach socket listeners
    player.connection.off('admin', 'start');
    player.connection.off('admin', 'stop');
    player.connection.off('stateReliable', 'input');
    player.connection.off('stateUnreliable', 'input');

    // Change the host
    if (this.host?.id === id) {
      if (this.players.length > 0) {
        this.host = this.players[0];
        this.handleHostInput();
      } else {
        this.host = null;
      }
    }
    this.lastDisconnect = Date.now();
  }

  /**
   * Send lobby information to the players
   */
  sendLobbyData() {
    const players: PlayerSocketData[] = this.players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        host: player.id === this.host?.id,
      };
    });
    for (const player of this.players) {
      const data: LobbySocketData = {
        players,
        playerId: player.id,
        playerName: player.name,
      };
      player.connection.emit('admin', 'lobby', data);
    }
  }

  /**
   * Generate all the maps for the current game starting from the initial map
   */
  generate() {
    const prefix = './maps/test_map/';

    const visited = new Set<string>();
    const queue = [this.initialMap];
    while (queue.length) {
      const file = queue.pop();
      if (!file || file === '.') continue;

      const map = new TmxMap(prefix + file);
      const world = new World(map, (entity, targetMap, targetSpawn) => {
        const nextWorld = this.worlds.get(targetMap);
        if (!nextWorld) return;

        const nextSpawn = nextWorld.map.getSpawns().get(targetSpawn);
        if (!nextSpawn) return;

        entity.center.x = nextSpawn.center.x;
        entity.center.y = nextSpawn.center.y;
        nextWorld.addEntity(entity);

        // Signal to the relevant player to transition maps
        const player = this.players.find((player) => player.entity === entity);
        const mapData = (nextWorld.map as ServerMap).getSocketData();
        player?.connection.emit('admin', 'mapTransition', {
          mapData,
          targetSpawn,
        });
      });
      this.worlds.set(file, world);

      // Look into neighboring maps
      for (const { targetMap } of map.getExits()) {
        if (!visited.has(targetMap)) {
          queue.push(targetMap);
        }
      }
    }

    // Associate each player with an entity and add them to the world
    const monsterIndex = Math.floor(randrange(0, this.players.length));
    this.players.forEach((player, index) => {
      const initialWorld = this.worlds.get(this.initialMap);
      if (!initialWorld) return;

      const initialSpawn = initialWorld.map.getSpawns().get('0');
      if (!initialSpawn) return;

      if (monsterIndex === index) {
        player.entity = new Monster(
          initialSpawn.center.x,
          initialSpawn.center.y
        );
      } else {
        player.entity = new Human(initialSpawn.center.x, initialSpawn.center.y);
      }
      player.world = initialWorld;
      initialWorld.addEntity(player.entity);
    });
  }

  /**
   * Send initial data to member players
   */
  sendStartData() {
    const key = this.key;
    this.players.forEach((player) => {
      const map = this.worlds.get(this.initialMap)?.map as ServerMap;
      if (!map) return;

      const mapData = map.getSocketData();
      player.connection.emit('admin', 'start', { key, mapData });
    });
  }

  /**
   * Broadcast players the relevant game state
   */
  broadcast() {
    this.players.forEach((player) => {
      const { connection, world, entity } = player;
      if (world && entity) {
        connection.emit(
          'stateUnreliable',
          'broadcastState',
          world.getSocketData(entity.id, Date.now())
        );
      }
    });
  }

  /**
   * Update simulation state per frame
   *
   * @param delta (ms)
   */
  update(delta: number) {
    // Handle buffered player input
    this.players.forEach((player) => {
      const { liveInput, deltaInput, entity } = player;
      const inputEvents = liveInput.concat(deltaInput);
      inputEvents.forEach((input) => {
        entity?.handleInput(input);
      });

      // Broadcast input events so other clients can simulate locally
      if (deltaInput.length > 0 && player.entity) {
        this.players.forEach((other) => {
          if (other !== player && player.entity) {
            other.connection.emit(
              'stateReliable',
              'broadcastInput',
              player.entity.id,
              {
                seq: Date.now(),
                input: deltaInput,
              }
            );
          }
        });
      }

      // Clear input buffers
      liveInput.splice(0, liveInput.length);
      deltaInput.splice(0, deltaInput.length);
    });

    // Run the simulation tick
    this.worlds.forEach((world) => {
      world.update(delta);
    });
  }
}

export { Game };
