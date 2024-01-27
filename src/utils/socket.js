import { io } from "socket.io-client";
import config from "./config";

const URL = config.urls.socket;

class SocketIo {
  socket = new io(URL, {autoConnect: false});

  connect = () => {
    this.socket.connect();
  };
};

const socketIo = new SocketIo();
export default socketIo;