import axios from "axios";
import store from "../redux/store";
import { fetchProductsAction } from "../redux/slicers/products-slicer";
import { fetchCategoriesAction } from "../redux/slicers/categories-slicer";
import { fetchSubCategoriesAction } from "../redux/slicers/subCategories-slicer";
import config from "../utils/config";

class StoreServices {
  fetchAllProducts = async () => {
    const response = await axios.get(config.urls.store.products);
    const products = response.data;
    store.dispatch(fetchProductsAction(products));
    return products;
  };

  fetchAllCategories = async () => {
    const response = await axios.get(config.urls.store.categories);
    const categories = response.data;
    store.dispatch(fetchCategoriesAction(categories));
    return categories;
  };

  fetchAllSubCategories = async () => {
    const response = await axios.get(config.urls.store.subCategories);
    const subCategories = response.data;
    store.dispatch(fetchSubCategoriesAction(subCategories));
    return subCategories;
  };
};

export const storeServices = new StoreServices();