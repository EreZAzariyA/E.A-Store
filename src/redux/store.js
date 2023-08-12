import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth-slicer"
import cartSlicer from "./slicers/cart-slicer";
import productsSlicer from "./slicers/products-slicer";
import categoriesSlicer from "./slicers/categories-slicer";
import subCategoriesSlicer from "./slicers/subCategories-slicer";
import { middleware } from "./middlewares/middleware";

const store = configureStore({
  reducer: {
    auth: authSlicer.reducer,
    shoppingCart: cartSlicer.reducer,
    products: productsSlicer.reducer,
    categories: categoriesSlicer.reducer,
    subCategories: subCategoriesSlicer.reducer,
  },
  middleware: [...getDefaultMiddleware(), middleware],
});

export default store;