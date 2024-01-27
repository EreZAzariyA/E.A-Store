import { socketListeners } from "./socket-listeners";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  socketListeners(socket, store);

  switch (action.type) {
    case 'auth/loginAction':
      socket.connect();
    break;
    case 'auth/logoutAction':
      socket.disconnect();
    break;
  }

  next(action);
};