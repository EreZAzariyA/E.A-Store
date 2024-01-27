import { adminListeners } from "./adminListeners";
import { socketListeners } from "./socket-listeners";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  socketListeners(socket, store);
  adminListeners(socket, store);

  next(action);
};