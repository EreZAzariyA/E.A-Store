import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { fetchUserCart } from "../redux/slicers/cart-slicer";

class ShoppingCartServices {

  fetchUserCart = async (user_id) => {
    if (!user_id) throw new Error('User _id is not found');
    const response = await axios.get(config.urls.cart.fetchUserCart + user_id);
    const shoppingCart = response.data;
    store.dispatch(fetchUserCart(shoppingCart))
    return shoppingCart;
  };


};

export const shoppingCartServices = new ShoppingCartServices();