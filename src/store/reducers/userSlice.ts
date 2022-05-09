import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "./types";

const initialState: IUserState = {
  user: null,
  token: null,
  isLoggedIn: false,
  auth: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state: IUserState,
      {
        payload: { user, accessToken },
      }: PayloadAction<{ user: IUser, accessToken: string }>
    ) => {
      state.user = user;
      state.token = accessToken;
      state.isLoggedIn = true;
    },
  },
});

export const { setCredentials } = userSlice.actions;

export const userReducer = userSlice.reducer;
