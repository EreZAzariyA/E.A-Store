import axios from "axios";
import store from "../redux/store";
import {
  addProductToCartAction,
  addProductToFavoritesAction,
  fetchUserCartAction,
  removeProductFromCartAction,
  removeProductFromFavoritesAction,
  resetCartAction,
  updateProductInCartAction
} from "../redux/slicers/cart-slicer";
import { validateDetails } from "../utils/helpers";
import config from "../utils/config";

class ShoppingCartServices {

  /**
  * Fetching shopping-cart by user_id.
  *
  * @param {String} user_id - The user_id to fetch shopping-cart.
  * @returns {Promise} A Promise that return the shopping-cart.
  */
  fetchUserShoppingCart = async (user_id) => {
    if (!user_id) throw new Error('User _id is not define');
    const response = await axios.get(config.urls.shoppingCart.fetchUserShoppingCart + user_id);
    const shoppingCart = response.data;
    store.dispatch(fetchUserCartAction(shoppingCart));
    return shoppingCart;
  };

  updateCartOrderDetails = async (shoppingCart_id, orderDetails) => {
    const response = await axios.post(config.urls.shoppingCart.updateCartOrderDetails, { shoppingCart_id, orderDetails: orderDetails });
    const updatedShoppingCart = response.data;
    store.dispatch(fetchUserCartAction(updatedShoppingCart));
    return updatedShoppingCart;
  };

  /**
  * Adds a product to the shopping cart.
  *
  * @param {String} product_id - The product to add to the shopping-cart.
  * @param {String} shoppingCart_id - The ID of the shopping-cart the product will insert.
  * @param {Number} amount - the amount of stock of the product.
  * @returns {Promise} A Promise that return the inserted product.
  */
  addProductToCart = async (product_id, shoppingCart_id, amount = 1) => {
    const details = {product_id, shoppingCart_id, amount};
    validateDetails(details);

    const response = await axios.post(config.urls.shoppingCart.addProductToCart, details);
    const addedProduct = response.data;
    store.dispatch(addProductToCartAction(addedProduct));
    return addedProduct;
  };

  /**
  * Adds a product to the shopping cart.
  *
  * @param {String} product_id - The product to add to the shopping-cart.
  * @param {String} shoppingCart_id - The ID of the shopping-cart the product will insert.
  * @param {Number} amount - The amount of stock of the product.
  * @param {Number} totalPrice - The amount of stock * product-price.
  * @returns {Promise} A Promise that return the inserted product.
  */
  updateStockInCart = async (shoppingCart_id, product_id, amount, totalPrice) => {
    const details = {shoppingCart_id, product_id, amount, totalPrice};
    const response = await axios.patch(config.urls.shoppingCart.updateStockInCart, details);
    const updatedProductInCart = response.data;
    store.dispatch(updateProductInCartAction(updatedProductInCart));
    return updatedProductInCart;
  };

  removeProductFromCart = async (shoppingCart_id, product_id) => {
    if (!(shoppingCart_id || product_id)) throw new Error('Some fields are missing');

    const response = await axios.delete(config.urls.shoppingCart.removeProductFromCart, {data: {shoppingCart_id, product_id}});
    const removedProduct = response.data;
    store.dispatch(removeProductFromCartAction(product_id));
    return removedProduct;
  };

  addProductToFavorites = async (product_id, shoppingCart_id) => {
    const details = {product_id, shoppingCart_id};
    const response = await axios.post(config.urls.shoppingCart.addProductToFavorites, details);
    const updatedShoppingCart = response.data;
    store.dispatch(addProductToFavoritesAction(updatedShoppingCart.favorites));
    return updatedShoppingCart.favorites;
  };

  removeProductFromFavorites = async (shoppingCart_id, product_id) => {
    const response = await axios.delete(config.urls.shoppingCart.removeProductFromFavorites, {data: {shoppingCart_id, product_id}});
    const removedProduct = response.data;
    store.dispatch(removeProductFromFavoritesAction(product_id));
    return removedProduct;
  };


  resetCart = async (shoppingCart_id) => {
    await axios.post(config.urls.shoppingCart.resetCart + shoppingCart_id);
    store.dispatch(resetCartAction());
  };
}

export const shoppingCartServices = new ShoppingCartServices();