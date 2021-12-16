import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginBtnTitle: "login",
  onClick: () => {},
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(state, action);
      state.value += 1;
    },
    logout: (state, action) => {
      console.log(state, action);
      state.value -= 1;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
