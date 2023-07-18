import { removeUserCart } from "../slicers/cart-slicer";

export const middleware = (store) => (next) => (action) => {
  const { dispatch, getState} = store;

  switch (action.type) {
    case 'auth/login':
      console.log('login');
    break;

    case 'auth/logout':
      console.log('logout');
      dispatch(removeUserCart());
    break;

    default:
    break;
  };

  next(action);
};