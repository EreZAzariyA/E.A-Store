
export const middleware = (socket) => (store) => (next) => (action) => {
  const { dispatch, getState } = store;

  socket.on('admin.add.product', (product) => {
    console.log(product);
  })

  switch (action.type) {
    case 'auth/login':
      console.log('login');
    break;

    case 'auth/logout':
      console.log('logout');
    break;

    default:
      console.log(action.type);
    break;
  };

  next(action);
};