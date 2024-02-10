import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth-slicer"
import cartSlicer from "./slicers/cart-slicer";
import productsSlicer from "./slicers/products-slicer";
import categoriesSlicer from "./slicers/categories-slicer";
import subCategoriesSlicer from "./slicers/subCategories-slicer";
import { middleware } from "./middlewares/middleware";
import orderSlicer from "./slicers/orders-slicer";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import socketIo from "../utils/socket";
import brandsSlicer from "./slicers/brands-slicer";

const io = socketIo.socket;

const store = configureStore({
  reducer: {
    auth: authSlicer.reducer,
    shoppingCart: cartSlicer.reducer,
    products: productsSlicer.reducer,
    categories: categoriesSlicer.reducer,
    subCategories: subCategoriesSlicer.reducer,
    brands: brandsSlicer.reducer,
    orders: orderSlicer.reducer,
  },
  middleware: [...getDefaultMiddleware(), middleware, socketMiddleware(io)],
});

export default store;