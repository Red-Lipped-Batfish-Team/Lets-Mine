import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import tokenReducer from "../features/authToken/tokenSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    token: tokenReducer,
    user: userReducer,
  },
});
