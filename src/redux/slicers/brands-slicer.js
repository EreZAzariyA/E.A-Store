import { createSlice } from "@reduxjs/toolkit";

const brandsSlicer = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    fetchBrandsAction(state, action) {
      state = action.payload;
      return state;
    },
    addBrandAction(state, action) {
      if (action.payload) {
        state.push(action.payload);
      }
      return state;
    },
    updateBrandAction(state, action) {
      const brandIndex = state.findIndex((c) => c._id === action.payload?._id);
      state[brandIndex] = action.payload;
      return state;
    },
    removeBrandAction(state, action) {
      const brandIndex = state.findIndex((c) => c._id === action.payload);
      if (brandIndex !== -1) {
        state.splice(brandIndex, 1);
      }
      return state;
    },
  }
});

export const {
  fetchBrandsAction,
  addBrandAction,
  updateBrandAction,
  removeBrandAction,
} = brandsSlicer.actions;
export default brandsSlicer;