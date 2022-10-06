import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs';
import WebSocket from 'ws';
import { Server } from './Server';
import { clamp } from 'dynamojs-engine';

dotenv.config();

const port = 3264;
let httpServer;
if (process.env.PRODUCTION) {
  httpServer = https.createServer({
    cert: fs.readFileSync('fullchain.pem', 'utf8'),
    key: fs.readFileSync('privkey.pem', 'utf8'),
  });
} else {
  httpServer = http.createServer();
}
httpServer.listen(port);

const wss = new WebSocket.Server({ server: httpServer });
const server = new Server(wss);

// eslint-disable-next-line no-console
console.log(`Hosting server on port ${port}`);

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
