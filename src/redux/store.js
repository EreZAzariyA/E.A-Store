import { configureStore } from "@reduxjs/toolkit";
import { middleware } from "./middleware";
import authSlice from "./slicers/auth-slicer"
import productsSlicer from "./slicers/products-slicer";


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlicer.reducer
  },
  middleware: [middleware]
})

export default store;