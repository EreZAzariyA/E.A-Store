import axios from "axios";
import config from "../utils/config";

class ProductsServices {

  fetchAllCategories = async () => {
    const response = await axios.get(config.urls.categories.fetchAllCategories);
    const categories = response.data;
    return categories;
  };
  
  fetchSubCategoriesByCategoryId = async (categoryId) => {
    const response = await axios.get(config.urls.subCategories.fetchSubCategoriesByCategoryId + categoryId);
    const subCategories = response.data;
    return subCategories;
  };

};

export const productsServices = new ProductsServices();