import { io } from "socket.io-client";
import config from "../utils/config";

class SocketIo {
  socket = io(config.urls.socket);

  initSocket = () => {
    this.socket.connect();
  }
};

const socketIo = new SocketIo();
export default socketIo;