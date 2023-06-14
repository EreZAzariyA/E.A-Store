import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';

export const AuthActionsTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER'
};

export const ProductsActionsType = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
};

export const CategoriesActionsType = {
  FETCH_CATEGORIES: 'FETCH_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
  FETCH_SUB_CATEGORIES: 'FETCH_SUB_CATEGORIES',
  ADD_SUB_CATEGORY: 'ADD_SUB_CATEGORY'
};

export const AuthActions = {
  login: createAction(AuthActionsTypes.LOGIN, (user) => ({user})),
  register: createAction(AuthActionsTypes.REGISTER, (user) => ({user}))
};

export const ProductsActions = {
  fetchProducts: createAction(ProductsActionsType.FETCH_PRODUCTS, (products) => ({products})),
  addProduct: createAction(ProductsActionsType.ADD_PRODUCT),
};

export const CategoriesActions = {
  fetchCategories: createAction(CategoriesActionsType.FETCH_CATEGORIES, (categories) => ({categories})),
  addCategory: createAction(CategoriesActionsType.ADD_CATEGORY),
  fetchSubCategories: createAction(CategoriesActionsType.FETCH_SUB_CATEGORIES, (subCategories) => ({subCategories})),
  addSubCategory: createAction(CategoriesActionsType.ADD_SUB_CATEGORY)
};