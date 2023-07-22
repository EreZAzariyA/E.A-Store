import axios from "axios";
import config from "../utils/config";
import store from "../redux/store";
import { addProductToCartAction, addProductToFavorites, fetchUserCart, removeProductFromCart, removeProductFromFavorites } from "../redux/slicers/cart-slicer";

const validateDetails = (details) => {
  if (!details.product_id) throw new Error('Product _id is not define');
  if (!details.shoppingCart_id) throw new Error('Shopping-cart _id is not found');
  if (!details.stock) throw new Error('Stock to order is not define');
};

class ShoppingCartServices {

  fetchUserCart = async (user_id) => {
    if (!user_id) throw new Error('User _id is not found');
    const response = await axios.get(config.urls.cart.fetchUserCart + user_id);
    const shoppingCart = response.data;
    store.dispatch(fetchUserCart(shoppingCart))
    return shoppingCart;
  };

  fetchItemsFromCart = async (shoppingCart_id) => {
    if (!shoppingCart_id) throw new Error('Shopping cart _id is not define');
    const response = await axios.get(config.urls.cart.fetchItemsFromUserCart + shoppingCart_id);
    const itemsInCart = response.data;
    return itemsInCart;
  }

  addProductToCart = async (product_id, shoppingCart_id, stock) => {
    const details = {product_id, shoppingCart_id, stock};
    validateDetails(details);
    const response = await axios.post(config.urls.cart.addProductToCart, details);
    const updatedSoppingCart = response.data;
    store.dispatch(addProductToCartAction(updatedSoppingCart.products));
    return updatedSoppingCart.products;
  };

  addProductToFavorites = async (product_id, shoppingCart_id) => {
    const details = {product_id, shoppingCart_id};
    const response = await axios.post(config.urls.cart.addProductToFavorites, details);
    const updatedSoppingCart = response.data;
    store.dispatch(addProductToFavorites(updatedSoppingCart.favorites));
    return updatedSoppingCart.favorites;
  };

  removeProductFromCart = async (shoppingCart_id, product_id) => {
    const response = await axios.delete(config.urls.cart.removeProductFromCart, {data: {shoppingCart_id, product_id}});
    const removedProduct = response.data;
    store.dispatch(removeProductFromCart(product_id));
    return removedProduct;
  };
  
  removeProductFromFavorites = async (shoppingCart_id, product_id) => {
    const response = await axios.delete(config.urls.cart.removeProductFromFavorites, {data: {shoppingCart_id, product_id}});
    const removedProduct = response.data;
    store.dispatch(removeProductFromFavorites(product_id));
    return removedProduct;
  };
};

export const shoppingCartServices = new ShoppingCartServices();