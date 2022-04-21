import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, TypeUserState, Auth } from "./types";

const initialState: TypeUserState = {
  user: null,
  isLoggedIn: false,
  auth: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
