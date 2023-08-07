export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  next(action);
};