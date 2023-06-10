import { createReducer } from 'redux-promise-middleware-actions';
import { combineReducers } from 'redux';
import { AuthActions } from './actions';


const authReducer = createReducer(null, (handleAction) => [
  handleAction(AuthActions.login, (state, {payload}) => {
    return {...state, ...payload};
  }),
  handleAction(AuthActions.register, (state, {payload}) => {
    return {...state, ...payload};
  })
]);

export default combineReducers({
  authReducer
});