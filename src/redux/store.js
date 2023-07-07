import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth-slicer"
import productsSlicer from "./slicers/products-slicer";
import categoriesSlicer from "./slicers/categories-slicer";
import subCategoriesSlicer from "./slicers/subCategories-slicer";
import socketServices from "../services/socket-services";
import { middleware } from "./middlewares/middleware";
import { socketMiddleware } from "./middlewares/socketMiddleware";

const store = configureStore({
  reducer: {
    auth: authSlicer.reducer,
    products: productsSlicer.reducer,
    categories: categoriesSlicer.reducer,
    subCategories: subCategoriesSlicer.reducer
  },
  middleware: [middleware, socketMiddleware(socketServices.socketIo)]
});

export default store;