import axios from "axios";
import config from "../../utils/config";
import store from "../../redux/store";
import { removeCategory } from "../../redux/slicers/categories-slicer";

class AdminCategoriesServices {

  // Categories:
  addCategory = async (categoryToAdd) => {
    const response = await axios.post(config.urls.admin.addCategory, categoryToAdd);
    const uploadedCategory = response.data;
    return uploadedCategory;
  };

  removeCategory = async (category_id) => {
    const response = await axios.delete(config.urls.admin.removeCategory + category_id);
    const removedItem = response.data;
    store.dispatch(removeCategory(category_id));
    return removedItem;
  };

  updateCategory = async (categoryToUpdate) => {
    const response = await axios.put(config.urls.admin.updateCategory, categoryToUpdate);
    const updatedCategory = response.data;
    return updatedCategory;
  };

  // Sub-Categories:
  addSubCategory = async (subCategoryToAdd) => {
    const response = await axios.post(config.urls.admin.addSubCategory, subCategoryToAdd);
    const uploadedCategory = response.data;
    return uploadedCategory;
  };

  removeSubCategory = async (subCategory_id) => {
    const response = await axios.delete(config.urls.admin.removeSubCategory + subCategory_id);
    const removedItem = response.data;
    return removedItem;
  };

  updateSubCategory = async (subCategoryToUpdate) => {
    const response = await axios.put(config.urls.admin.updateSubCategory, subCategoryToUpdate);
    const updatedSubCategory = response.data;
    return updatedSubCategory;
  };
};

export const adminCategoriesServices = new AdminCategoriesServices();