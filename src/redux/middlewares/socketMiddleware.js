export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  socket.on('admin-update-category', (category) => {
    console.log(category);
  })
  next(action);
};