import { createSlice } from "@reduxjs/toolkit";

const categoriesSlicer = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    fetchCategoriesAction(state, action) {
      state = action.payload;
      return state;
    },
    addCategoryAction(state, action) {
      if (action.payload) {
        state.push(action.payload);
      }
      return state;
    },
    updateCategoryAction(state, action) {
      const categoryIndex = state.findIndex((c) => c._id === action.payload?._id);
      state[categoryIndex] = action.payload;
      return state;
    },
    removeCategoryAction(state, action) {
      const categoryIndex = state.findIndex((c) => c._id === action.payload);
      if (categoryIndex !== -1) {
        state.splice(categoryIndex, 1);
      }
      return state;
    },
  }
});

export const {
  fetchCategoriesAction,
  addCategoryAction,
  updateCategoryAction,
  removeCategoryAction,
} = categoriesSlicer.actions;
export default categoriesSlicer;