import { createSlice } from "@reduxjs/toolkit";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";

const initialState = {
  loginBtnTitle: "login",
  onClick: () => {},
};

export const counterSlice = createSlice({
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

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
