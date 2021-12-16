import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginBtnTitle: "login",
  onClick: () => {},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value += 1;
    },
    logout: (state, action) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
