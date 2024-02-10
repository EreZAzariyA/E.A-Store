import axios from "axios";
import store from "../../redux/store";
import {
  addSubCategoryAction,
  removeSubCategoryAction,
  updateSubCategoryAction
} from "../../redux/slicers/subCategories-slicer";
import config from "../../utils/config";

class AdminSubCategoriesServices {
  addSubCategory = async (subCategoryToAdd) => {
    const response = await axios.post(config.urls.admin.subCategories.addSubCategory, subCategoryToAdd);
    const uploadedSubCategory = response.data;
    store.dispatch(addSubCategoryAction(uploadedSubCategory))
    return uploadedSubCategory;
  };

  removeSubCategory = async (subCategory_id) => {
    const response = await axios.delete(config.urls.admin.subCategories.removeSubCategory + subCategory_id);
    const removedItem = response.data;
    store.dispatch(removeSubCategoryAction(subCategory_id));
    return removedItem;
  };

  updateSubCategory = async (subCategoryToUpdate) => {
    const response = await axios.put(config.urls.admin.subCategories.updateSubCategory, subCategoryToUpdate);
    const updatedSubCategory = response.data;
    store.dispatch(updateSubCategoryAction(updatedSubCategory));
    return updatedSubCategory;
  };
}

export const adminSubCategoriesServices = new AdminSubCategoriesServices();