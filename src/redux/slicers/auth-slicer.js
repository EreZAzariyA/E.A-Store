import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from "jwt-decode";

const token = localStorage.getItem('token');

const initialState = token ? {
  token: token,
  user: jwtDecode(token)
} : null;

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction(state, action) {
      if (!action.payload) return;
      const token = action.payload;
      localStorage.setItem('token', token);
      state = {
        token: token,
        user: jwtDecode(token)
      };
      return state
    },
    registerAction(state, action) {
    },
    logoutAction(state, action) {
      localStorage.removeItem('token');
      state = {token: null, user: null}
      return state;
    },
    refreshTokenAction(state, action) {
      state = {
        token: action.payload,
        user: jwtDecode(action.payload)
      };
      return state;
    }
  }
});

export const {
  loginAction,
  registerAction,
  logoutAction,
  refreshTokenAction,
  } = authSlicer.actions;
export default authSlicer;