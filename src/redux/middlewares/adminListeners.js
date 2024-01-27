import { createOrderAction } from "../slicers/orders-slicer";

export const adminListeners = (socket, store) => {
  const { dispatch } = store;

  socket.on('user-create-order', (order) => {
    dispatch(createOrderAction(order));
  });
}