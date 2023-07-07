import { addProduct } from "../slicers/products-slicer";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { dispatch, getState } = store;

  // socket.on('admin.add.product', (product) => {
  //   console.log('admin.add.product');
  //   // dispatch(addProduct(product));
  // })

  next(action);
};