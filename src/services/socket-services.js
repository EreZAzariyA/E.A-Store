import { io } from "socket.io-client";

const URL = "https://k6u7v23xwh.execute-api.eu-central-1.amazonaws.com";

// const URL = "wss://tz89n3jufi.execute-api.eu-central-1.amazonaws.com/production";
// const URL = "http://127.0.0.1:5000";

const options = {
  reconnectionAttempts: 3,
  autoConnect: true,
  reconnection: true,
  transports: ['websocket'],
}

class SocketServices {

  socketIo;

  constructor() {
    this.socketIo = new io(URL, { ...options,  });

    this.socketIo.on('connect', () => {
      const engine = this.socketIo.io.engine;
      console.log(engine.transport.name); 

      engine.once("upgrade", () => {
        console.log(engine.transport.name);
      });

    });
  };

};

const socketServices = new SocketServices();
export default socketServices;
