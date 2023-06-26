import jwtDecode from "jwt-decode";
import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token');

const initialState = token ? {
  token: token,
  user: jwtDecode(token)
} : null;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      console.log(state);
      console.log(action);
    },
    register(state, action) {
      console.log(state);
      console.log(action);
    },
    logout(action) {
      console.log(action);
    }
  }
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;