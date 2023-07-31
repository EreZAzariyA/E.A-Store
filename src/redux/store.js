import { configureStore } from "@reduxjs/toolkit";
import { socketServices } from "../services/socket-services";
import authSlicer from "./slicers/auth-slicer"
import cartSlicer from "./slicers/cart-slicer";
import productsSlicer from "./slicers/products-slicer";
import categoriesSlicer from "./slicers/categories-slicer";
import subCategoriesSlicer from "./slicers/subCategories-slicer";
import { middleware } from "./middlewares/middleware";
import { socketMiddleware } from "./middlewares/socketMiddleware";

const store = configureStore({
  reducer: {
    auth: authSlicer.reducer,
    shoppingCart: cartSlicer.reducer,
    products: productsSlicer.reducer,
    categories: categoriesSlicer.reducer,
    subCategories: subCategoriesSlicer.reducer,
  },
  middleware: [middleware, socketMiddleware(socketServices.socketIo)]
});

export default store;