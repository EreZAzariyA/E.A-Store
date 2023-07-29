import { createSlice } from "@reduxjs/toolkit";

const productsSlicer = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    fetchProducts(state, action) {
      state = action.payload;
      return state;
    },
    addProduct(state, action) {
      state.push(action.payload);
      return state;
    },
    updateProduct(state, action) {
      const productIndex = state.findIndex((p) => p._id === action.payload._id);
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
        state.push(action.payload);
      };
      return state;
    },
    removeProduct(state, action) {
      const productIndex = state.findIndex((p) => p._id === action.payload);
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
      }
      return state;
    }
  }
});

export const { fetchProducts, addProduct, updateProduct, removeProduct } = productsSlicer.actions;
export default productsSlicer;