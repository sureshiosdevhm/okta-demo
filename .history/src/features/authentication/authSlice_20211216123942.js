import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      return (state.isLoggedIn = true);
    },
    logout: (state) => {
      return (state.isLoggedIn = false);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
