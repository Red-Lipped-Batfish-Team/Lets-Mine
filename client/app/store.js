import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/authToken/tokenSlice";

export default configureStore({
  reducer: {
    tokenReducer,
  },
});
