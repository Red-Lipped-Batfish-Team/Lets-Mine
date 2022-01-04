import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setToken: (state, action) => {
      sessionStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    clearToken: (state) => {
      sessionStorage.clear();
      state.token = "";
    },
  },
});

export const { setToken, clearToken, getToken } = tokenSlice.actions;

export default tokenSlice.reducer;
