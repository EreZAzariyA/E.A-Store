import { addCategoryAction, removeCategoryAction, updateCategoryAction } from "../slicers/categories-slicer";
import { addProductAction, removeProductAction, updateProductAction } from "../slicers/products-slicer";
import { addSubCategoryAction, removeSubCategoryAction, updateSubCategoryAction } from "../slicers/subCategories-slicer";


export const socketListeners = (socket, store) => {
  const { dispatch } = store;

  // Products
  socket.on('admin-add-product', (product) => {
    dispatch(addProductAction(product));
  });
  socket.on('admin-update-product', (product) => {
    dispatch(updateProductAction(product));
  });
  socket.on('admin-remove-product', (product_id) => {
    dispatch(removeProductAction(product_id));
  });

  // Categories
  socket.on('admin-add-category', (category) => {
    dispatch(addCategoryAction(category));
  });
  socket.on('admin-update-category', (category) => {
    dispatch(updateCategoryAction(category));
  });
  socket.on('admin-remove-category', (category_id) => {
    dispatch(removeCategoryAction(category_id));
  });

  // Sub-Categories
  socket.on('admin-add-subCategory', (subCategory) => {
    dispatch(addSubCategoryAction(subCategory));
  });
  socket.on('admin-update-subCategory', (subCategory) => {
    dispatch(updateSubCategoryAction(subCategory));
  });
  socket.on('admin-remove-subCategory', (subCategory_id) => {
    dispatch(removeSubCategoryAction(subCategory_id));
  });
};