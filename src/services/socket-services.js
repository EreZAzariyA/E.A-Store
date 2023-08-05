import { io } from "socket.io-client";

const URL = "http://127.0.0.1:5000/";

class SocketServices {
  socketIo;

  constructor () {
    this.socketIo = new io(process.env.SOCKET_URL || URL);
  };

}

export const socketServices = new SocketServices();
