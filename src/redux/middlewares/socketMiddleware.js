import { addProduct, removeProduct, updateProduct } from "../slicers/products-slicer";
import { addCategory, removeCategory, updateCategory } from "../slicers/categories-slicer";
import { addSubCategory, removeSubCategory, updateSubCategory } from "../slicers/subCategories-slicer";

export const socketMiddleware = (socket) => (store) => (next) => (action) => {
  const { dispatch, getState } = store;

  if (socket.connected) {
    socket.on('admin.add.product', (product) => {
      dispatch(addProduct(product));
    });
    socket.on('admin.update.product', (updatedProduct) => {
      dispatch(updateProduct(updatedProduct));
    });
    socket.on('admin.remove.product', (product_id) => {
      dispatch(removeProduct(product_id));
    });
  
  
    socket.on('admin.add.category', (category) => {
      dispatch(addCategory(category));
    });
    socket.on('admin.remove.category', (categoryId) => {
      dispatch(removeCategory(categoryId));
    });
    socket.on('admin.update.category', (updatedCategory) => {
      dispatch(updateCategory(updatedCategory));
    });
  
  
    socket.on('admin.add.subCategory', (subCategory) => {
      dispatch(addSubCategory(subCategory));
    });
    socket.on('admin.remove.subCategory', (subCategoryId) => {
      dispatch(removeSubCategory(subCategoryId));
    });
    socket.on('admin.update.subCategory', (updatedSubCategory) => {
      dispatch(updateSubCategory(updatedSubCategory));
    });
  }

  next(action);
};