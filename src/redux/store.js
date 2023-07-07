import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth-slicer"
import productsSlicer from "./slicers/products-slicer";
import categoriesSlicer from "./slicers/categories-slicer";
import subCategoriesSlicer from "./slicers/subCategories-reducer";
import socketServices from "../services/socket-services";
// import { socketMiddleware } from "./middlewares/socketMiddleware";
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

  // middleware: (getDefaultMiddleware) => (
  //   getDefaultMiddleware().concat(socketMiddleware(socketServices.socketIo), middleware)
  // )
})

export default store;