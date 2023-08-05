export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { dispatch, getState } = store;

  next(action);
};