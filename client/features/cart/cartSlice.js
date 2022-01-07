import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQuantity: 0,
  totalPrice: 0,
  totalDuration: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateTotal: (state, action) => {
      console.log(action.payload);
      const price =
        action.payload.price *
        (action.payload.quantity + action.payload.duration);
      state.totalQuantity += action.payload.quantity;
      state.totalDuration += action.payload.duration;
      state.totalPrice += price;
    },
    resetTotal: (state) => {
      state.totalQuantity = 0;
      state.totalDuration = 0;
      state.totalPrice = 0;
    },
  },
});

export const { updateTotal, resetTotal } = cartSlice.actions;

export default cartSlice.reducer;
