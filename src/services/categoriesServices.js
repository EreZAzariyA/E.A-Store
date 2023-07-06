import axios from "axios";
import store from "../redux/store";
import config from "../utils/config";
import { fetchCategories } from "../redux/slicers/categories-slicer";
import { fetchSubCategories } from "../redux/slicers/subCategories-reducer";


class CategoriesServices {

  fetchAllCategories = async () => {
    if (!store.getState().categories.length) {
      const response = await axios.get(config.urls.categories.fetchAllCategories);
      const categories = response.data;
      store.dispatch(fetchCategories(categories));
      return categories;
    };
    const categories = store.getState().categories;
    return categories;
  };

  fetchOneCategory = async (category_id) => {
    if (!store.getState().categories.length) {
      const response = await axios.get(config.urls.categories.fetchOneCategory + category_id);
      const category = response.data;
      return category;
    };
    const category = store.getState().categories.find((c) => c._id === category_id);
    return category;
  }

  fetchAllSubCategories = async () => {
    if (!store.getState().subCategories.length) {
      const response = await axios.get(config.urls.subCategories.fetchAllSubCategories);
      const subCategories = response.data;
      store.dispatch(fetchSubCategories(subCategories));
      return subCategories;
    };
    const subCategories = store.getState().subCategories;
    return subCategories;
  };

  fetchOneSubCategory = async (subCategory_id) => {
    if (!store.getState().subCategories.length) {
      const response = await axios.get(config.urls.subCategories.fetchOneSubCategory + subCategory_id);
      const subCategory = response.data;
      return subCategory;
    };
    const category = store.getState().subCategories.find((subC) => subC._id === subCategory_id);
    return category;
  };

  fetchSubCategoriesByCategoryId = async (categoryId) => {
    if (!store.getState().subCategories.length) {
      const response = await axios.get(config.urls.subCategories.fetchSubCategoriesByCategoryId + categoryId);
      const subCategories = response.data;
      return subCategories;
    };
    const subCategories = store.getState().subCategories;
    const subCategoriesByCategoryId = [...subCategories].filter((subC) => subC.category_id === categoryId);
    return subCategoriesByCategoryId;
  };
};

export const categoriesServices = new CategoriesServices();
