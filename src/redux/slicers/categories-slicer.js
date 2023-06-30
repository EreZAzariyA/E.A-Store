import { createSlice } from "@reduxjs/toolkit";

const categoriesSlicer = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    fetchCategories(state, action) {
      return state = action.payload;
    },
  }
});

export const { 
  fetchCategories,
} = categoriesSlicer.actions;
export default categoriesSlicer;