import axios from "axios";
import config from "../../utils/config";

class AdminProductsServices {
  addProduct = async (productToUpload) => {
    const response = await axios.post(config.urls.admin.addProduct, productToUpload);
    const uploadedProduct = response.data;
    return uploadedProduct;
  };

  removeProduct = async (product_id) => {
    const response = await axios.delete(config.urls.admin.removeProduct + product_id);
    const removedItem = response.data;
    return removedItem;
  };

  updateProduct = async (productToUpdate) => {
    const response = await axios.put(config.urls.admin.updateProduct, productToUpdate);
    const updatedProduct = response.data;
    return updatedProduct;
  };
};

export const adminProductsServices = new AdminProductsServices();