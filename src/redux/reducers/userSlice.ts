import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState, Auth } from "./types";

const initialState: IUserState = {
  user: {
    id: 2,
    email: "ro@qwer.ua;",
    firstName: "Ro",
    lastName: "Pe",
    role: "free",
    phoneNumber: "+066612345",
    password: "123456789",
  },
  isLoggedIn: false,
  auth: null,
  isLoading: false,
  error: null,
  isHasPassword: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmail(state: IUserState, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
