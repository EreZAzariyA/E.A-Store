import { createSlice } from "@reduxjs/toolkit";

const subCategoriesSlicer = createSlice({
  name: 'subCategories',
  initialState: [],
  reducers: {
    fetchSubCategoriesAction(state, action) {
      state = action.payload;
      return state;
    },
    addSubCategoryAction(state, action) {
      if (action.payload) {
        state.push(action.payload);
      };
      return state;
    },
    updateSubCategoryAction(state, action) {
      const subCategoryIndex = state.findIndex((subC) => subC._id === action.payload?._id);
      if (subCategoryIndex !== -1) {
        state.splice(subCategoryIndex, 1);
        state.push(action.payload);
      };
      return state;
    },
    removeSubCategoryAction(state, action) {
      const subCategoryIndex = state.findIndex((subC) => subC._id === action.payload);
      if (subCategoryIndex !== -1) {
        state.splice(subCategoryIndex, 1);
      };
      return state;
    },
  }
});

export const {
  fetchSubCategoriesAction,
  addSubCategoryAction,
  updateSubCategoryAction,
  removeSubCategoryAction,
} = subCategoriesSlicer.actions;
export default subCategoriesSlicer;