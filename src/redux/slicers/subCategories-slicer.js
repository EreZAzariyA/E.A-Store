import { createSlice } from "@reduxjs/toolkit";

const subCategoriesSlicer = createSlice({
  name: 'subCategories',
  initialState: [],
  reducers: {
    fetchSubCategories(state, action) {
      state = action.payload;
      return state;
    },
    addSubCategory(state, action) {
      state.push(action.payload);
      return state;
    },
    updateSubCategory(state, action) {
      const subCategoryIndex = state.findIndex((subC) => subC._id === action.payload._id);
      if (subCategoryIndex !== -1) {
        state.splice(subCategoryIndex, 1);
        state.push(action.payload);
      };
      return state;
    },
    removeSubCategory(state, action) {
      const subCategoryIndex = state.findIndex((subC) => subC._id === action.payload);
      if (subCategoryIndex !== -1) {
        state.splice(subCategoryIndex, 1);
      }
      return state;
    }
  }
});

export const {
  fetchSubCategories,
  addSubCategory,
  updateSubCategory,
  removeSubCategory
} = subCategoriesSlicer.actions;
export default subCategoriesSlicer;