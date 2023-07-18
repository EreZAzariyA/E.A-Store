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
    }
  }
});

export const {
  fetchUserCart,
  removeUserCart
} = cartSlicer.actions;
export default cartSlicer;