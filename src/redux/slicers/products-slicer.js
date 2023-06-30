import { createSlice } from "@reduxjs/toolkit";


const productsSlicer = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    fetchProducts(state, action) {
      return state = action.payload;
    },
    addProduct(state, action) {
      const addedProduct = action.payload
      state.push(addedProduct);
      return state;
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