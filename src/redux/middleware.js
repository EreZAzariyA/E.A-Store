
export const middleware = (store) => (next) => (action) => {
  console.log(action.type);
  next(action);
};