import axios from "axios";
import store from "../../redux/store";
import {
  addProductAction,
  removeProductAction,
  updateProductAction
} from "../../redux/slicers/products-slicer";
import config from "../../utils/config";

class AdminProductsServices {
  addProduct = async (productToUpload) => {
    const response = await axios.post(config.urls.admin.addProduct, productToUpload);
    const uploadedProduct = response.data;
    if (uploadedProduct) {
      store.dispatch(addProductAction(uploadedProduct));
      return uploadedProduct;
    };
  };

  removeProduct = async (product_id) => {
    const response = await axios.delete(config.urls.admin.removeProduct + product_id);
    const removedItem = response.data;
    store.dispatch(removeProductAction(product_id));
    return removedItem;
  };

  updateProduct = async (productToUpdate) => {
    const response = await axios.put(config.urls.admin.updateProduct, productToUpdate);
    const updatedProduct = response.data;
    store.dispatch(updateProductAction(productToUpdate));
    return updatedProduct;
  };
};

export const adminProductsServices = new AdminProductsServices();
