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
    removeProduct(state, action) {
      const product = action.payload;
      const productIndex = state.findIndex((p) => p._id === product._id);
      const newState = state.slice(productIndex, 1);
      return state = newState;
    }
  }
});

export const { fetchProducts, addProduct, removeProduct } = productsSlicer.actions;
export default productsSlicer;