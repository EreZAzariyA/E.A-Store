import { createSlice } from "@reduxjs/toolkit";

const productsSlicer = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    fetchProductsAction(state, action) {
      state = action.payload;
      return state;
    },
    addProductAction(state, action) {
      state.push(action.payload);
      return state;
    },
    updateProductAction(state, action) {
      const productIndex = state.findIndex((p) => p._id === action.payload._id);
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
        state.push(action.payload);
      }
      return state;
    },
    removeProductAction(state, action) {
      const productIndex = state.findIndex((p) => p._id === action.payload);
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
      }
      return state;
    }
  }
});

export const {
  fetchProductsAction,
  addProductAction,
  updateProductAction,
  removeProductAction,
} = productsSlicer.actions;
export default productsSlicer;