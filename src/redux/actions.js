import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';

export const AuthActionsTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER'
};

export const AuthActions = {
  login: createAction(AuthActionsTypes.LOGIN, (user) => ({user})),
  register: createAction(AuthActionsTypes.REGISTER, (user) => ({user}))
};