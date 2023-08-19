import { createSlice } from "@reduxjs/toolkit";

const orderSlicer = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    fetchUserOrdersAction(state, action) {
      state = action.payload;
      return state;
    },
    createOrderAction(state, action) {
      state.push(action.payload);
      return state;
    },
    resetOrdersAction(state) {
      state = [];
      return state;
    }
  }
});

export const {
  fetchUserOrdersAction,
  createOrderAction,
  resetOrdersAction,
} = orderSlicer.actions;
export default orderSlicer;