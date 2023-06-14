import axios from "axios";
import config from "../utils/config";


class AdminServices {

  addProduct = async (productToUpload) => {
    const response = await axios.post(config.urls.admin.addProduct, productToUpload);
    const uploadedProduct = response.data;
    return uploadedProduct;
  };

  addCategory = async (categoryToAdd) => {
    const response = await axios.post(config.urls.admin.addCategory, categoryToAdd);
    const uploadedCategory = response.data;
    return uploadedCategory;
  }

};

export const adminServices = new AdminServices();