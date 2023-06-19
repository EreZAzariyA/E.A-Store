import { createReducer } from 'redux-promise-middleware-actions';
import { combineReducers } from 'redux';
import jwtDecode from "jwt-decode";
import { AuthActions, CategoriesActions, ProductsActions } from './actions';

const token = localStorage.getItem('token');

const initialValue = token ? {
  token: token,
  user: jwtDecode(token)
} : null;

const authReducer = createReducer(initialValue, (handleAction) => [
  handleAction(AuthActions.login, (state, {payload}) => {
    const { token } = payload;
    localStorage.setItem('token', token);
    return {
      ...state,
      token: token,
      user: jwtDecode(token)
    };
  }),
  handleAction(AuthActions.register, (state, {payload}) => {
    return {...state, ...payload};
  }),
  handleAction(AuthActions.logout, () => {
    localStorage.removeItem('token');
    return null;
  })
]);

const productsReducer = createReducer([], (handleAction) => [
  handleAction(ProductsActions.fetchProducts , (state, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }),
  handleAction(ProductsActions.addProduct , (state, { payload }) => ({
    ...state,
    ...payload
  })),
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
  authReducer,
  productsReducer,
  categoriesReducer
});
