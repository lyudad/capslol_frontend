import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPassword } from "./types";

const initialState: IPassword = {
  isHasEmail: "",
  isRightPassword: false,
};

export const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    confirmEmail(state, action: PayloadAction<string>) {
      state.isHasEmail = action.payload;
    },
    resetPassword(state, action: PayloadAction<boolean>) {
      state.isRightPassword = action.payload;
    },
  },
});

export const { confirmEmail, resetPassword } = passwordSlice.actions;
export default passwordSlice.reducer;
