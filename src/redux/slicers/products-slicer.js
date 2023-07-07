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
      const newState = [...state]
      newState.push(action.payload);
      return newState;
    },
    updateProduct(state, action) {
      const productId = action.payload._id;
      const productIndex = state.findIndex((p) => p._id === productId);
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
        state.push(action.payload);
      };
      return state;
    },
    removeProduct(state, action) {
      const productId = action.payload;
      const productIndex = state.findIndex((p) => p._id === productId);
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
      }
      return state;
    }
  }
});

export const { fetchProducts, addProduct, updateProduct, removeProduct } = productsSlicer.actions;
export default productsSlicer;