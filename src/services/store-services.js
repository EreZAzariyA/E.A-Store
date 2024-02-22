import axios from "axios";
import store from "../redux/store";
import config from "../utils/config";
import { fetchProductsAction } from "../redux/slicers/products-slicer";
import { fetchCategoriesAction } from "../redux/slicers/categories-slicer";
import { fetchSubCategoriesAction } from "../redux/slicers/subCategories-slicer";
import { fetchBrandsAction } from "../redux/slicers/brands-slicer";

class StoreServices {
  fetchAllProducts = async () => {
    if (!store.getState().products.length) {
      const response = await axios.get(config.urls.store.products.all);
      const products = response.data;
      store.dispatch(fetchProductsAction(products));
      return products;
    }
    const products = store.getState().products;
    return products;
  };

  fetchNewestProducts = async () => {
    const response = await axios.get(config.urls.store.products.newest);
    const products = response.data;
    return products;
  };

  searchProducts = async (productToSearch) => {
    const response = await axios.get(config.urls.store.products.search + productToSearch);
    const products = response.data;
    return products;
  };

  fetchAllCategories = async () => {
    if (!store.getState().categories.length) {
      const response = await axios.get(config.urls.store.categories);
      const categories = response.data;
      store.dispatch(fetchCategoriesAction(categories));
      return categories;
    }
    const categories = store.getState().categories;
    return categories;
  };

  fetchAllSubCategories = async () => {
    if (!store.getState().subCategories.length) {
      const response = await axios.get(config.urls.store.subCategories);
      const subCategories = response.data;
      store.dispatch(fetchSubCategoriesAction(subCategories));
      return subCategories;
    }
    const subCategories = store.getState().subCategories;
    return subCategories;
  };

  fetchAllBrands = async () => {
    if (!store.getState().brands.length) {
      const response = await axios.get(config.urls.store.brands);
      const brands = response.data;
      store.dispatch(fetchBrandsAction(brands));
      return brands;
    }
    const brands = store.getState().brands;
    return brands;
  };
};

export const storeServices = new StoreServices();