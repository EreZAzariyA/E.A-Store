import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { createOrderAction, fetchUserOrdersAction } from "../redux/slicers/orders-slicer";


class OrdersServices {

  fetchUserOrdersByUser_id = async (user_id) => {
    const response = await axios.get(config.urls.order.fetchUserOrders + user_id);
    const orders = response.data;
    store.dispatch(fetchUserOrdersAction(orders));
    return orders;
  };

  createOrder = async (orderDetails) => {
    const response = await axios.post(config.urls.order.createOrder, orderDetails);
    const createdOrder = response.data;
    store.dispatch(createOrderAction(createdOrder));
    return createdOrder;
  };
};

export const ordersServices = new OrdersServices();
