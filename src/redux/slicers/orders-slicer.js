import { createSlice } from "@reduxjs/toolkit";

const orderSlicer = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    fetchAllOrdersAction(state, action) {
      state = action.payload;
      return state;
    },
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
    },
    updateOrderStatusAction(state, action) {
      const index = [...state].findIndex((o) => o._id === action.payload.order_id);
      state[index].status = action.payload.status;
      return state;
    }
  }
});

export const {
  fetchAllOrdersAction,
  fetchUserOrdersAction,
  createOrderAction,
  resetOrdersAction,
  updateOrderStatusAction
} = orderSlicer.actions;
export default orderSlicer;