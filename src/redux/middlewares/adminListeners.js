
export const adminListeners = (socket, store) => {

  socket.on('user-add-product', (order) => {
    console.log(order);
  });
}