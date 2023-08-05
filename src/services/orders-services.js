import axios from "axios";
import config from "../utils/config";


class OrdersServices {
  createOrder = async (orderDetails) => {
    const response = await axios.post(config.urls.order.createOrder, orderDetails);
    const createdOrder = response.data;
    return createdOrder;
  }

}

export const ordersServices = new OrdersServices();
