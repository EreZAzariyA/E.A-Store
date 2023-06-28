import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { CategoriesActions, ProductsActions } from "../redux/actions";

class ProductsServices {

  fetchAllProducts = async () => {
    if (!store.getState().productsReducer.products) {
      const response = await axios.get(config.urls.products.fetchAllProducts);
      const products = response.data;
      store.dispatch(ProductsActions.fetchProducts(products));
      return products;
    };
    const products = store.getState().productsReducer.products;
    return products;
  };

  fetchProductsBySubCategoryId = async (subCategory_id) => {
    if (!store.getState().productsReducer.products) {
      const response = await axios.get(config.urls.products.fetchProductsBySubCategoryId + subCategory_id);
      const productsBySubCategory = response.data;
      return productsBySubCategory;
    };
    const products = store.getState().productsReducer.products;
    const productsBySubCategory = [...products]?.filter((p) => (p.subCategory_id === subCategory_id));
    return productsBySubCategory;
  };

  fetchAllCategories = async () => {
    if (!store.getState().categoriesReducer.categories) {
      const response = await axios.get(config.urls.categories.fetchAllCategories);
      const categories = response.data;
      store.dispatch(CategoriesActions.fetchCategories(categories));
      return categories;
    };
    const categories = store.getState().categoriesReducer.categories;
    return categories;
  };

  fetchOneCategory = async (category_id) => {
    if (!store.getState().categoriesReducer.categories) {
      const response = await axios.get(config.urls.categories.fetchOneCategory + category_id);
      const category = response.data;
      return category;
    };
    const category = store.getState().categoriesReducer.categories.find((c) => c._id === category_id);
    return category;
  }

  fetchAllSubCategories = async () => {
    if (!store.getState().categoriesReducer.subCategories) {
      const response = await axios.get(config.urls.subCategories.fetchAllSubCategories);
      const subCategories = response.data;
      // console.log(subCategories);
      store.dispatch(CategoriesActions.fetchSubCategories(subCategories));
      return subCategories;
    };
    const subCategories = store.getState().categoriesReducer.subCategories;
    return subCategories;
  };

  fetchOneSubCategory = async (subCategory_id) => {
    if (!store.getState().categoriesReducer.subCategories) {
      const response = await axios.get(config.urls.subCategories.fetchOneSubCategory + subCategory_id);
      const subCategory = response.data;
      return subCategory;
    };
    const category = store.getState().categoriesReducer.subCategories.find((subC) => subC._id === subCategory_id);
    return category;
  };

  fetchSubCategoriesByCategoryId = async (categoryId) => {
    const response = await axios.get(config.urls.subCategories.fetchSubCategoriesByCategoryId + categoryId);
    const subCategories = response.data;
    return subCategories;
  };

  fetchProductsByCategoryId = async (categoryId) => {
    if (!store.getState().productsReducer.product) {
      const response = await axios.get(config.urls.products.fetchProductsByCategoryId + categoryId);
      const productsByCategory = response.data;
      return productsByCategory;
    }
    const productsByCategory = [...store.getState().productsReducer.products].filter((product) => (product.category_id !== categoryId));
    return productsByCategory;
  };
};

export const productsServices = new ProductsServices();