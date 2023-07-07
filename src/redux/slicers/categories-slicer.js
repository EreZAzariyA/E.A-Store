import { createSlice } from "@reduxjs/toolkit";

const categoriesSlicer = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    fetchCategories(state, action) {
      return state = action.payload;
    },
    removeCategory(state, action) {
      const categoryId = action.payload;
      const categoryIndex = state.findIndex((p) => p._id === categoryId);
      if (categoryIndex !== -1) {
        state.splice(categoryIndex, 1);
      }
      return state;
    }
  }
});

export const { 
  fetchCategories,
  removeCategory
} = categoriesSlicer.actions;
export default categoriesSlicer;