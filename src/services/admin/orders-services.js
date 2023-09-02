import axios from "axios";
import config from "../../utils/config";

class AdminOrdersServices {

  async fetchAllOrders() {
    const response = await axios.get(config.urls.admin.fetchAllOrders);
    const orders = response.data;
    return orders;
  };

};

const adminOrdersServices = new AdminOrdersServices();
export default adminOrdersServices;