import { addProduct, removeProduct, updateProduct } from "../slicers/products-slicer";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { dispatch } = store;
  
  socket.on('connect', () => {

    socket.on('admin.add.product', (product) => {
      dispatch(addProduct(product));
    });
    socket.on('admin.update.product', (updatedProduct) => {
      dispatch(updateProduct(updatedProduct));
    });
    socket.on('admin.remove.product', (product_id) => {
      dispatch(removeProduct(product_id));
    });
  });

  next(action);
};