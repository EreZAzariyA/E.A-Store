import axios from "axios";
import config from "../../utils/config";
import store from "../../redux/store";
import { addProduct, removeProduct, updateProduct } from "../../redux/slicers/products-slicer";

class AdminProductsServices {
  addProduct = async (productToUpload) => {
    const response = await axios.post(config.urls.admin.addProduct, productToUpload);
    const uploadedProduct = response.data;
    store.dispatch(addProduct(uploadedProduct));
    return uploadedProduct;
  };

  removeProduct = async (product_id) => {
    const response = await axios.delete(config.urls.admin.removeProduct + product_id);
    const removedItem = response.data;
    store.dispatch(removeProduct(product_id));
    return removedItem;
  };

  updateProduct = async (productToUpdate) => {
    const response = await axios.put(config.urls.admin.updateProduct, productToUpdate);
    const updatedProduct = response.data;
    store.dispatch(updateProduct(productToUpdate));
    return updatedProduct;
  };
};

export const adminProductsServices = new AdminProductsServices();