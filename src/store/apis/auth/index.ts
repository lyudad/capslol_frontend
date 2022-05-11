import {
  Email,
  IAuthRequest,
  IResponse,
  Password,
} from "store/slices/auth/auth.type";
import { baseApi } from "..";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<IResponse, IAuthRequest>({
      query: (credentials) => ({
        url: "auth/createUser",
        method: "POST",
        body: {
          user: credentials,
        },
      }),
    }),
    signUpUseGoogle: builder.query<IResponse, string>({
      query: (tokenId) => ({
        url: "auth/createUserUseGoogle",
        params: {
          tokenId,
        },
      }),
    }),
    selectRole: builder.query<IResponse, number>({
      query: (roleType) => ({
        url: "auth/selectRole",
        params: {
          role: roleType,
        },
      }),
    }),
    signInUseGoogle: builder.query<IResponse, string>({
      query: (tokenId) => ({
        url: "auth/loginUseGoogle",
        params: {
          tokenId,
        },
      }),
    }),
    login: builder.mutation<IResponse, IAuthRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: {
          user: credentials,
        },
      }),
    }),
    confirmEmail: builder.mutation<Email, string>({
      query: (email) => ({
        url: `auth/forgotPassword`,
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation<any, Password>({
      query: (value) => ({
        url: `auth/changePassword?token=${value.token}`,
        method: "PUT",
        body: { password: value.password },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLazySignUpUseGoogleQuery,
  useLazySignInUseGoogleQuery,
  useLoginMutation,
  useLazySelectRoleQuery,
  useResetPasswordMutation,
  useConfirmEmailMutation,
} = authApi;
