import { removeUserCartAction } from "../slicers/cart-slicer";
import { resetOrdersAction } from "../slicers/orders-slicer";

export const middleware = (store) => (next) => (action) => {
  const { dispatch } = store;

  switch (action.type) {
    case 'auth/logoutAction':
      dispatch(removeUserCartAction());
      dispatch(resetOrdersAction());
    break;

    default:
    break;
  }

  next(action);
};