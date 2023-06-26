import { applyMiddleware, crea } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { middleware } from "./middleware";


// const store = createStore(rootReducer ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = configureStore({
  reducer: rootReducer,
  // devTools: window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware: [middleware]
})

export default store;