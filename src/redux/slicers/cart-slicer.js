import { createSlice } from "@reduxjs/toolkit";

const cartSlicer = createSlice({
  name: 'shopping_cart',
  initialState: {
    products: [],
    favorites: [],
  },
  reducers: {
    fetchUserCart(state, action) {
      state = action.payload;
      return state;
    },
    removeUserCart(state) {
      state = null;
      return state;
    },
    addProductToCartAction(state, action) {
      state.products = action.payload;
      return state;
    },
    updateCartAction(state, action) {
      state.products = action.payload;
      return state;
    },
    addProductToFavorites(state, action) {
      state.favorites = action.payload;
      return state;
    },
    removeProductFromCart(state, action) {
      const index = state.products.findIndex((product) => product.product_id === action.payload);
      state.products.splice(index, 1);
      return state;
    },
    removeProductFromFavorites(state, action) {
      const index = state.favorites.findIndex((productId) => productId === action.payload);
      state.favorites.splice(index, 1);
      return state;
    },
    resetCartAction(state) {
      state.products = [];
      return state;
    },
  }
});

export const {
  fetchUserCart,
  removeUserCart,
  addProductToCartAction,
  updateCartAction,
  addProductToFavorites,
  removeProductFromCart,
  removeProductFromFavorites,
  resetCartAction
} = cartSlicer.actions;
export default cartSlicer;