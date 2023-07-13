import axios from "axios";
import { io } from "socket.io-client";
import config from "../utils/config";

const URL = "http://127.0.0.1:5000";

const options = {
  reconnectionAttempts: 3,
  autoConnect: true,
  reconnection: true,
}

class SocketServices {
  socketIo;

  constructor() {
    this.socketIo = new io(URL, options);

    this.socketIo.on('connect', () => {
      const engine = this.socketIo.io.engine;
      console.log(engine.transport.name); 

      engine.once("upgrade", () => {
        console.log(engine.transport.name);
      });

    });
  };

  connect = async () => {
    const response = await axios.post(config.urls.socket.connect);
    const connected = response.data;
    console.log(connected);
  };

};

const socketServices = new SocketServices();
export default socketServices;
