import { removeUserCartAction } from "../slicers/cart-slicer";

export const middleware = (store) => (next) => (action) => {
  const { dispatch } = store;

  switch (action.type) {
    case 'auth/logoutAction':
      dispatch(removeUserCartAction());
    break;

    default:
    break;
  }

  next(action);
};