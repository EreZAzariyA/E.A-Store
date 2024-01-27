import { socketListeners } from "./socket-listeners";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  socketListeners(socket, store);

  next(action);
};