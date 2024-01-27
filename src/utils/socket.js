import { io } from "socket.io-client";
import config from "./config";

const URL = config.urls.socket;

class SocketIo {
  socket = new io(URL);

  connect = () => {
    this.socket.connect();
  };
};

const socketIo = new SocketIo();
export default socketIo;