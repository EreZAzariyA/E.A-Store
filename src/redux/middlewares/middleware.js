
export const middleware = (store) => (next) => (action) => {

  switch (action.type) {
    case 'auth/login':
      console.log('login');
    break;

    case 'auth/logout':
      console.log('logout');
    break;

    default:
    break;
  };

  next(action);
};