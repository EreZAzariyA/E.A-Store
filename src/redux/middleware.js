// import { CategoriesActionsType } from "./actions";


export const middleware = (store) => (next) => (action) => {
  const { getState, dispatch } = store;

  // switch (action.type) {
  //   case CategoriesActionsType.FETCH_CATEGORIES:
  //     const { categories } = action.payload;
  //     // dispatch(CategoriesActions.fetchCategories(categories));
  //     break;
  //   default:
  //     break;
  // }

  console.log(action.type);
  next(action);
};