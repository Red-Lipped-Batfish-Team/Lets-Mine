import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    quantity: 2,
    total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      //TODO: add check to see if item.id exists in cart,
      //if not then
          state.quanity += action.payload.quantity; //change this to reflect qunaitiy of item added
          state.products.push(action.payload.product);
      state.total += action.payload.price
      
      //if so then, search cart and update item quantity 
    }

    //addQuantity

    //minusQuantity

    //removeCart
  },
});

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
