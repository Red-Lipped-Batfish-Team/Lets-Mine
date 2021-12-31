import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/coutner/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})