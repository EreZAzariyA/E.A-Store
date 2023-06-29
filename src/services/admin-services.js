import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { ProductsActions } from "../redux/actions";


class AdminServices {

  addProduct = async (productToUpload) => {
    const response = await axios.post(config.urls.admin.addProduct, productToUpload);
    const uploadedProduct = response.data;
    store.dispatch(ProductsActions.addProduct(uploadedProduct));
    return uploadedProduct;
  };

  removeProduct = async (product_id) => {
    const response = await axios.delete(config.urls.admin.removeProduct + product_id);
    store.dispatch(ProductsActions.removeProduct(product_id));
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
};

export const adminServices = new AdminServices();