import { Signaler, SignalingMessage } from 'dynamojs-net';
import { Socket } from 'socket.io';

class ServerSignaler implements Signaler {
  private socket: Socket;

  /**
   * Create a server signaler instance
   *
   * @param socket WebSocket instance
   */
  constructor(socket: Socket) {
    this.socket = socket;
  }

  send(message: SignalingMessage) {
    this.socket.emit('signal', message);
  }

  listen(handler: (message: SignalingMessage) => void) {
    this.socket.on('signal', handler);
  }
}

export default ServerSignaler;
