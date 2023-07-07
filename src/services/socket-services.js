import { io } from "socket.io-client";

const local = "http://localhost:5000";

class SocketServices {

  socketIo;

  constructor() {
    this.socketIo = new io("wss://k6u7v23xwh.execute-api.eu-central-1.amazonaws.com", { autoConnect: true });
  };

};

const socketServices = new SocketServices();
export default socketServices;
