import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from './Server';
import { clamp } from 'dynamojs-engine';

const app = express();
const httpServer = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Run the server
const port = 3200;
httpServer.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Listening on port ${port}`);
});

// Run game logic
const server = new Server(httpServer);

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

// Broadcast game state 20 times a second
setInterval(() => server.broadcast(), 1000.0 / 20.0);
