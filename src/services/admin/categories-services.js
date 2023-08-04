import axios from "axios";
import store from "../../redux/store";
import {
  addCategoryAction,
  removeCategoryAction,
  updateCategoryAction
} from "../../redux/slicers/categories-slicer";
import config from "../../utils/config";

class AdminCategoriesServices {
  addCategory = async (categoryToAdd) => {
    const response = await axios.post(config.urls.admin.addCategory, categoryToAdd);
    const uploadedCategory = response.data;
    if (uploadedCategory) {
      store.dispatch(addCategoryAction(uploadedCategory));
      return uploadedCategory;
    };
  };

  removeCategory = async (category_id) => {
    const response = await axios.delete(config.urls.admin.removeCategory + category_id);
    const removedItem = response.data;
    store.dispatch(removeCategoryAction(category_id));
    return removedItem;
  };

  updateCategory = async (categoryToUpdate) => {
    const response = await axios.put(config.urls.admin.updateCategory, categoryToUpdate);
    const updatedCategory = response.data;
    store.dispatch(updateCategoryAction(updatedCategory));
    return updatedCategory;
  };
};

export const adminCategoriesServices = new AdminCategoriesServices();