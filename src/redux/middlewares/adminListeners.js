
export const adminListeners = (socket, store) => {
  const { dispatch } = store;

  socket.on('user-create-order', (order) => {
    console.log(order);
  });
}