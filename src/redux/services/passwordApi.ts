import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Email, Password } from "redux/models/password.model";

export const passwordApi = createApi({
  reducerPath: "passwordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Email"],
  endpoints: (build) => ({
    confirmEmail: build.mutation<Email, Email>({
      query: (email) => ({
        url: `password/forgotPassword`,
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["Email"],
    }),
    resetPassword: build.mutation<Password, Password>({
      query: (value) => ({
        url: `password/changePassword`,
        method: "PATCH",
        body: value,
      }),
      invalidatesTags: ["Email"],
    }),
  }),
});

export const { useConfirmEmailMutation, useResetPasswordMutation } =
  passwordApi;
