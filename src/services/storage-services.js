import axios from "axios";
import config from "../utils/config";


class StorageServices {
  uploadImage = async (file, type) => {
    const response = await axios.post(config.urls.admin.uploadImage + `/${type?.toLowerCase()}`, file);
    const imageUrl = response.data;
    return imageUrl;
  };
}

export const storageServices = new StorageServices();