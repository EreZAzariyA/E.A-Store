import { io } from "socket.io-client";

class SocketIo {
  socket = io('http://localhost:5000');

  initSocket = () => {
    this.socket.connect();
  }
};

const socketIo = new SocketIo();
export default socketIo;