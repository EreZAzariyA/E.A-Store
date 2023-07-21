import { createSlice } from "@reduxjs/toolkit";

const cartSlicer = createSlice({
  name: 'shopping_cart',
  initialState: null,
  reducers: {
    fetchUserCart(state, action) {
      state = action.payload;
      return state;
    },
    removeUserCart(state) {
      state = null;
      return state;
    },
    addProductToCart(state, action) {
      state.products = action.payload;
      return state;
    },
    removeProductFromCart(state, action) {
      state.products.filter((product) => product._id !== action.payload);
      return state;
    }
  }
});

export const {
  fetchUserCart,
  removeUserCart,
  addProductToCart,
  removeProductFromCart
} = cartSlicer.actions;
export default cartSlicer;