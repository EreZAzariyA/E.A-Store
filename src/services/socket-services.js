import { io } from "socket.io-client";

const URL = "http://127.0.0.1:5000/";

class SocketServices {
  socketIo;

  constructor () {
    this.socketIo = new io(URL);
  };
};

export const socketServices = new SocketServices();
