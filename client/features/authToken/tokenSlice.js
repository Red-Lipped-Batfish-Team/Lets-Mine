import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setToken: (state, action) => {
      sessionStorage.setItem("token", JSON.stringify(action.payload));
      state.token = action.payload;
    },
    clearToken: (state) => {
      sessionStorage.clear();
      state.token = "";
    },
    getToken: (state) => {
      const token = JSON.parse(sessionStorage.getItem("token"));
      state.token = token;
    },
  },
});

export const { setToken, clearToken, getToken } = tokenSlice.actions;

export default tokenSlice.reducer;
