import axios from "axios";
import config from "../utils/config";

class ProductsServices {

  fetchAllProducts = async () => {
    const response = await axios.get(config.urls.products.fetchAllProducts);
    const products = response.data;
    return products;
  };

  fetchAllCategories = async () => {
    const response = await axios.get(config.urls.categories.fetchAllCategories);
    const categories = response.data;
    return categories;
  };

  fetchAllSubCategories = async () => {
    const response = await axios.get(config.urls.subCategories.fetchAllSubCategories);
    const subCategories = response.data;
    return subCategories;
  };
  
  fetchSubCategoriesByCategoryId = async (categoryId) => {
    const response = await axios.get(config.urls.subCategories.fetchSubCategoriesByCategoryId + categoryId);
    const subCategories = response.data;
    return subCategories;
  };

};

export const productsServices = new ProductsServices();