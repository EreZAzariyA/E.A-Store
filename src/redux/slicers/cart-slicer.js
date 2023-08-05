import { createSlice } from "@reduxjs/toolkit";

const cartSlicer = createSlice({
  name: 'shopping_cart',
  initialState: {
    products: [],
    favorites: [],
  },
  reducers: {
    fetchUserCartAction(state, action) {
      state = action.payload;
      return state;
    },
    removeUserCartAction(state) {
      state = null;
      return state;
    },
    addProductToCartAction(state, action) {
      state.products.push(action.payload);
      return state;
    },
    updateCartAction(state, action) {
      state.products = action.payload;
      return state;
    },
    addProductToFavoritesAction(state, action) {
      state.favorites = action.payload;
      return state;
    },
    removeProductFromCartAction(state, action) {
      const index = state.products.findIndex((product) => product.product_id === action.payload);
      state.products.splice(index, 1);
      return state;
    },
    removeProductFromFavoritesAction(state, action) {
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
  fetchUserCartAction,
  removeUserCartAction,
  addProductToCartAction,
  updateCartAction,
  addProductToFavoritesAction,
  removeProductFromCartAction,
  removeProductFromFavoritesAction,
  resetCartAction,
} = cartSlicer.actions;
export default cartSlicer;