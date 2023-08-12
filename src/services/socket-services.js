import { io } from "socket.io-client";
import config from "../utils/config";

class SocketServices {
  socketIo;

  constructor () {
    this.socketIo = new io(URL);
  };
};

export const socketServices = new SocketServices();
