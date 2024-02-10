import axios from "axios";
import store from "../../redux/store";
import config from "../../utils/config";
import { addBrandAction, removeBrandAction, updateBrandAction } from "../../redux/slicers/brands-slicer";

class AdminBrandsServices {
  addBrand = async (brandToAdd) => {
    const response = await axios.post(config.urls.admin.brands.addBrand, brandToAdd);
    const uploadedBrand = response.data;
    if (uploadedBrand) {
      store.dispatch(addBrandAction(uploadedBrand));
      return uploadedBrand;
    }
  };

  removeBrand = async (brand_id) => {
    const response = await axios.delete(config.urls.admin.brands.removeBrand + brand_id);
    const removedItem = response.data;
    store.dispatch(removeBrandAction(brand_id));
    return removedItem;
  };

  updateBrand = async (categoryToUpdate) => {
    const response = await axios.put(config.urls.admin.brands.updateBrand, categoryToUpdate);
    const updatedBrand = response.data;
    store.dispatch(updateBrandAction(updatedBrand));
    return updatedBrand;
  };
};

export const adminBrandsServices = new AdminBrandsServices();