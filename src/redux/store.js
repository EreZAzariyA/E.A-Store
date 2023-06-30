import { configureStore } from "@reduxjs/toolkit";
import { middleware } from "./middleware";
import authSlicer from "./slicers/auth-slicer"
import productsSlicer from "./slicers/products-slicer";
import categoriesSlicer from "./slicers/categories-slicer";
import subCategoriesSlicer from "./slicers/subCategories-reducer";

const store = configureStore({
  reducer: {
    auth: authSlicer.reducer,
    products: productsSlicer.reducer,
    categories: categoriesSlicer.reducer,
    subCategories: subCategoriesSlicer.reducer
  },
  middleware: [middleware]
})

export default store;