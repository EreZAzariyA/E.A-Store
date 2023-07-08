import { io } from "socket.io-client";

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

};

const socketServices = new SocketServices();
export default socketServices;
