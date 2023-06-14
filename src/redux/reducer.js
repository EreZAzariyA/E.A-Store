import { createReducer } from 'redux-promise-middleware-actions';
import { combineReducers } from 'redux';
import { AuthActions, CategoriesActions, ProductsActions } from './actions';


const authReducer = createReducer(null, (handleAction) => [
  handleAction(AuthActions.login, (state, {payload}) => {
    return {...state, ...payload};
  }),
  handleAction(AuthActions.register, (state, {payload}) => {
    return {...state, ...payload};
  })
]);

const productsReducer = createReducer(null, (handleAction) => [
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

const categoriesReducer = createReducer(null, (handleAction) => [
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


// const productsReducer = createReducer(null, (handleAction) => [
  // handleAction(ProductsActions.addProduct.pending ,(state) => ({
  //   ...state,
  //   pending: true
  // })),
  // handleAction(ProductsActions.addProduct.rejected, (state) => ({
  //   ...state,
  //   pending: false
  // })),
  // handleAction(ProductsActions.addProduct.fulfilled, (state, { payload }) => ({
  //   ...state,
  //   ...payload,
  //   pending: false
  // }))
//   handleAction(ProductsActions.fetchProducts.pending , (state) => ()),
//   handleAction(ProductsActions.addProduct.pending ,(state) => ({
//     ...state,
//     pending: true
//   })),
//   handleAction(ProductsActions.addProduct.rejected, (state) => ({
//     ...state,
//     pending: false
//   })),
//   handleAction(ProductsActions.addProduct.fulfilled, (state, { payload }) => ({
//     ...state,
//     ...payload,
//     pending: false
//   }))
// ])

export default combineReducers({
  authReducer,
  productsReducer,
  categoriesReducer
});