import jwtDecode from "jwt-decode";
import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token');

const initialState = token ? {
  token: token,
  user: jwtDecode(token)
} : null;

const authSlicer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      if (!action.payload) return;
      const token = action.payload;
      localStorage.setItem('token', token);
      state = {
        token: token,
        user: jwtDecode(token)
      };
      return state
    },
    register(state, action) {
    },
    logout(state, action) {
      localStorage.removeItem('token');
      state = {token: null, user: null}
      return state;
    },
    refreshToken(state, action) {
      state = {
        token: action.payload,
        user: jwtDecode(action.payload)
      };
      return state;
    }
  }
});

export const { login, register, logout, refreshToken } = authSlicer.actions;
export default authSlicer;