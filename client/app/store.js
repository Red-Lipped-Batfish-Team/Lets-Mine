import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/coutner/counterSlice'
import cartReducer from '../features/coutner/cartSlice'
import tokenReducer from "../features/authToken/tokenSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    token: tokenReducer,


});
