import { createReducer } from 'redux-promise-middleware-actions';
import { combineReducers } from 'redux';
import { CategoriesActions, ProductsActions } from './actions';




const products = createReducer([], (handleAction) => [
  handleAction(ProductsActions.fetchProducts , (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }),
  handleAction(ProductsActions.addProduct , (state, { payload }) => {
    state = {
      ...state,
      products: [...state?.products, payload]
    };
    
    return {
      ...state,
    }
    // return [...state.products, payload]
  }),
  handleAction(ProductsActions.removeProduct, (state, {payload}) => {
    state.products = [...state?.products]?.filter((p) => p._id !== payload);
    return {
      ...state
    }
  })
]);

const categoriesReducer = createReducer([], (handleAction) => [
  handleAction(CategoriesActions.fetchCategories , (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }),
  handleAction(CategoriesActions.fetchSubCategories , (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }),
  handleAction(CategoriesActions.addCategory , (state, { payload }) => ({
    ...state,
    ...payload
  })),
  handleAction(CategoriesActions.addSubCategory , (state, { payload }) => ({
    ...state,
    ...payload
  })),
]);

export default combineReducers({
  products,
  categoriesReducer
});
