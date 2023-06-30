import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { addProduct, removeProduct } from "../redux/slicers/products-slicer";


class AdminServices {

  addProduct = async (productToUpload) => {
    const response = await axios.post(config.urls.admin.addProduct, productToUpload);
    const uploadedProduct = response.data;
    store.dispatch(addProduct(uploadedProduct));
    return uploadedProduct;
  };

  removeProduct = async (product_id) => {
    const response = await axios.delete(config.urls.admin.removeProduct + product_id);
    store.dispatch(removeProduct(product_id));
    const removedItem = response.data;
    return removedItem;
  };

  updateProduct = async (productToUpdate) => {
    const response = await axios.put(config.urls.admin.updateProduct, productToUpdate);
    const updatedProduct = response.data;
    return updatedProduct;
  };

  addCategory = async (categoryToAdd) => {
    const response = await axios.post(config.urls.admin.addCategory, categoryToAdd);
    const uploadedCategory = response.data;
    return uploadedCategory;
  };

  removeCategory = async (category_id) => {
    const response = await axios.delete(config.urls.admin.removeCategory + category_id);
    const removedItem = response.data;
    return removedItem;
  };

  updateCategory = async (categoryToUpdate) => {
    const response = await axios.put(config.urls.admin.updateCategory, categoryToUpdate);
    const updatedCategory = response.data;
    return updatedCategory;
  };
  
  addSubCategory = async (subCategoryToAdd) => {
    const response = await axios.post(config.urls.admin.addSubCategory, subCategoryToAdd);
    const uploadedCategory = response.data;
    return uploadedCategory;
  };

  removeSubCategory = async (subCategory_id) => {
    const response = await axios.delete(config.urls.admin.removeSubCategory + subCategory_id);
    const removedItem = response.data;
    return removedItem;
  };

  updateSubCategory = async (subCategoryToUpdate) => {
    const response = await axios.put(config.urls.admin.updateSubCategory, subCategoryToUpdate);
    const updatedSubCategory = response.data;
    return updatedSubCategory;
  };
};

export const adminServices = new AdminServices();