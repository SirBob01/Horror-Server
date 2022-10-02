import { Signaler, SignalingMessage } from 'dynamojs-net';
import WebSocket from 'ws';

class ServerSignaler implements Signaler {
  private socket: WebSocket;

  /**
   * Create a server signaler instance
   *
   * @param socket WebSocket instance
   */
  constructor(socket: WebSocket) {
    this.socket = socket;
  }

  send(message: SignalingMessage) {
    this.socket.send(JSON.stringify(message));
  }

  listen(handler: (message: SignalingMessage) => void) {
    this.socket.on('message', (data) => {
      const message = JSON.parse(data.toString());
      handler(message);
    });
  }
}

export default ServerSignaler;
