import { createSlice } from "@reduxjs/toolkit";

const categoriesSlicer = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    fetchCategories(state, action) {
      state = action.payload;
      return state;
    },
    addCategoryAction(state, action) {
      state.push(action.payload);
      return state;
    },
    updateCategoryAction(state, action) {
      const categoryIndex = state.findIndex((c) => c._id === action.payload._id);
      if (categoryIndex !== -1) {
        state.splice(categoryIndex, 1);
        state.push(action.payload);
      };
      return state;
    },
    removeCategory(state, action) {
      const categoryIndex = state.findIndex((c) => c._id === action.payload);
      if (categoryIndex !== -1) {
        state.splice(categoryIndex, 1);
      }
      return state;
    }
  }
});

export const {
  fetchCategories,
  addCategoryAction,
  updateCategoryAction,
  removeCategory
} = categoriesSlicer.actions;
export default categoriesSlicer;