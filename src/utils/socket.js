import { io } from "socket.io-client";

class SocketIo {
  socket = new io('http://127.0.0.1:5000');

  connect = () => {
    this.socket.connect();
  };
};

const socketIo = new SocketIo();
export default socketIo;