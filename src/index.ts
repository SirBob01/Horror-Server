import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from './Server';
import { clamp } from 'dynamojs-engine';

const app = express();
const http_server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Run the server
const port = 3200;
http_server.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Listening on port ${port}`);
});

// Run game logic
const server = new Server(http_server);

// Update the server simulations at full capacity
let last_time = 0;
const dt_cap = 100;
const callback = (elapsed: number) => {
  const dt = clamp(elapsed - last_time, 0, dt_cap);
  last_time = elapsed;
  server.update(dt);

  setImmediate(() => callback(Date.now()));
};
setImmediate(() => callback(Date.now()));

// Broadcast game state 10 times a second
setInterval(() => server.broadcast(), 1000.0 / 10.0);
