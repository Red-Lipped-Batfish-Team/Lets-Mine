import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateTotal: (state, action) => {
      console.log(action.payload);
      const price = action.payload.quantity * action.payload.price;
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += price;
    },
  },
});

export const { updateTotal } = cartSlice.actions;

export default cartSlice.reducer;
