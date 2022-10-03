import { Server } from './Server';
import { clamp } from 'dynamojs-engine';

// Run game logic
const server = new Server(3264);

// Update the server simulations at full capacity
let lastTime = 0;
const dtCap = 100;
const callback = (elapsed: number) => {
  const dt = clamp(elapsed - lastTime, 0, dtCap);
  lastTime = elapsed;
  server.update(dt);

  setImmediate(() => callback(Date.now()));
};
setImmediate(() => callback(Date.now()));

// Broadcast game state 15 times a second
setInterval(() => server.broadcast(), 1000.0 / 15.0);
