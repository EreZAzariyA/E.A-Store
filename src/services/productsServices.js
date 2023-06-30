import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { fetchProducts } from "../redux/slicers/products-slicer";

class ProductsServices {

  fetchAllProducts = async () => {
    if (!store.getState().products.length) {
      const response = await axios.get(config.urls.products.fetchAllProducts);
      const products = response.data;
      store.dispatch(fetchProducts(products));
      return products;
    };
    const products = store.getState().products;
    return products;
  };

  fetchProductsBySubCategoryId = async (subCategory_id) => {
    if (!store.getState().products.length) {
      const response = await axios.get(config.urls.products.fetchProductsBySubCategoryId + subCategory_id);
      const productsBySubCategory = response.data;
      return productsBySubCategory;
    };
    const products = store.getState().products;
    const productsBySubCategory = [...products].filter((p) => (p.subCategory_id === subCategory_id));
    return productsBySubCategory;
  };

  fetchProductsByCategoryId = async (categoryId) => {
    if (!store.getState().products.length) {
      const response = await axios.get(config.urls.products.fetchProductsByCategoryId + categoryId);
      const productsByCategory = response.data;
      return productsByCategory;
    }
    const products = store.getState().products;
    const productsByCategory = [...products].filter((product) => (product.category_id !== categoryId));
    return productsByCategory;
  };
};

export const productsServices = new ProductsServices();
