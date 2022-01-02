import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/coutner/cartSlice";
import tokenReducer from "../features/authToken/tokenSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    token: tokenReducer,
  },
});
