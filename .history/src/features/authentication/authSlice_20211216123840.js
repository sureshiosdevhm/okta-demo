import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(state, action);
      state.loginBtnTitle = "Logout";
    },
    logout: (state, action) => {
      console.log(state, action);
      state.loginBtnTitle = "Login";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
