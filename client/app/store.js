import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/coutner/counterSlice'
import cartReducer from '../features/coutner/cartSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer
  },
})