import { io } from "socket.io-client";

class SocketIo {
  socket = io(process.env.SOCKET_URL || 'http://localhost:5000');

  initSocket = () => {
    this.socket.connect();
  }
};

const socketIo = new SocketIo();
export default socketIo;