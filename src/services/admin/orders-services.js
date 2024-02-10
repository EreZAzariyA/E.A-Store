import axios from "axios";
import config from "../../utils/config";
import store from "../../redux/store";
import { fetchAllOrdersAction } from "../../redux/slicers/orders-slicer";

class AdminOrdersServices {

  async fetchAllOrders() {
    const response = await axios.get(config.urls.admin.orders.fetchAllOrders);
    const orders = response.data;
    store.dispatch(fetchAllOrdersAction(orders));
    return orders;
  };

};

const adminOrdersServices = new AdminOrdersServices();
export default adminOrdersServices;