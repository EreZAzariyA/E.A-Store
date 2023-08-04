import axios from "axios";
import store from "../redux/store";
import {
  addProductToCartAction,
  addProductToFavoritesAction,
  fetchUserCartAction,
  removeProductFromCartAction,
  removeProductFromFavoritesAction,
  resetCartAction,
  updateCartAction
} from "../redux/slicers/cart-slicer";
import config from "../utils/config";

const validateDetails = (details) => {
  if (details) {
    Object.entries(details).forEach(([key, value]) => {
      if (!value || value === null || value === 0 || value === undefined) {
        throw new Error(`${key} is missing`);
      };
    });
  };
};

class ShoppingCartServices {

  fetchUserShoppingCart = async (user_id) => {
    if (!user_id) throw new Error('User _id is not define');
    const response = await axios.get(config.urls.cart.fetchUserShoppingCart + user_id);
    const shoppingCart = response.data;
    store.dispatch(fetchUserCartAction(shoppingCart));
    return shoppingCart;
  };

  addProductToCart = async (product_id, shoppingCart_id, stock) => {
    const details = {product_id, shoppingCart_id, stock};
    validateDetails(details);

    const response = await axios.post(config.urls.cart.addProductToCart, details);
    const updatedShoppingCart = response.data;
    store.dispatch(addProductToCartAction(updatedShoppingCart.products));
    return updatedShoppingCart.products;
  };

  updateStockInCart = async (shoppingCart_id, product_id, stock, totalPrice) => {
    const details = {shoppingCart_id, product_id, stock, totalPrice};
    const response = await axios.patch(config.urls.cart.updateStockInCart, details);
    const updatedShoppingCart = response.data;
    store.dispatch(updateCartAction(updatedShoppingCart.products));
    return updatedShoppingCart.products;
  };

  removeProductFromCart = async (shoppingCart_id, product_id) => {
    if (!(shoppingCart_id || product_id)) throw new Error('Some fields are missing');

    const response = await axios.delete(config.urls.cart.removeProductFromCart, {data: {shoppingCart_id, product_id}});
    const removedProduct = response.data;
    store.dispatch(removeProductFromCartAction(product_id));
    return removedProduct;
  };

  addProductToFavorites = async (product_id, shoppingCart_id) => {
    const details = {product_id, shoppingCart_id};
    const response = await axios.post(config.urls.cart.addProductToFavorites, details);
    const updatedShoppingCart = response.data;
    store.dispatch(addProductToFavoritesAction(updatedShoppingCart.favorites));
    return updatedShoppingCart.favorites;
  };

  removeProductFromFavorites = async (shoppingCart_id, product_id) => {
    const response = await axios.delete(config.urls.cart.removeProductFromFavorites, {data: {shoppingCart_id, product_id}});
    const removedProduct = response.data;
    store.dispatch(removeProductFromFavoritesAction(product_id));
    return removedProduct;
  };


  resetCart = async (shoppingCart_id) => {
    await axios.post(config.urls.cart.resetCart + shoppingCart_id);
    store.dispatch(resetCartAction());
  };
};

export const shoppingCartServices = new ShoppingCartServices();