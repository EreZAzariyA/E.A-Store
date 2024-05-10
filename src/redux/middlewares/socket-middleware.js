
export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { dispatch } = store;
  // console.log(socket);

  if (socket) {
    socket.io.on('admin-add-category', (value) => {
      console.log({value});
    })
  }

  return next(action);
};