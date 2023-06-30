import { createSlice } from "@reduxjs/toolkit";

const subCategoriesSlicer = createSlice({
  name: 'subCategories',
  initialState: [],
  reducers: {
    fetchSubCategories(state, action) {
      return state = action.payload;
    }
  }
});

export const { fetchSubCategories } = subCategoriesSlicer.actions;
export default subCategoriesSlicer;