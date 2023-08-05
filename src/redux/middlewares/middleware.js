import { removeUserCartAction } from "../slicers/cart-slicer";

export const middleware = (store) => (next) => (action) => {
  const { dispatch, getState} = store;

  switch (action.type) {
    case 'auth/logout':
      dispatch(removeUserCartAction());
    break;

    default:
    break;
  }

  next(action);
};