import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Email, Password } from "redux/models/passwordModels/password.model";

export const passwordApi = createApi({
  reducerPath: process.env.REACT_APP_PASSWORD_API,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BE_URL,
  }),
  endpoints: (build) => ({
    confirmEmail: build.mutation<Email, Email>({
      query: (email) => ({
        url: `password/forgotPassword`,
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: build.mutation<Password, Password>({
      query: (value) => ({
        url: `password/changePassword`,
        method: "PATCH",
        body: value,
      }),
    }),
  }),
});

export const { useConfirmEmailMutation, useResetPasswordMutation } =
  passwordApi;
