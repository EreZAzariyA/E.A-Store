import { io } from "socket.io-client";

const url = "http://localhost:5000";

class SocketServices {

  socketIo;

  constructor() {
    this.socketIo = new io(url, { autoConnect: true });
  };

};

const socketServices = new SocketServices();
export default socketServices;
