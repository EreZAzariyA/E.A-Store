import { io } from "socket.io-client";

const url = "http://localhost:5000";

class SocketServices {

  socketIo;

  constructor() {
    this.socketIo = new io(url, {autoConnect: false});
  };

};

const socketServices = new SocketServices();
export default socketServices;
