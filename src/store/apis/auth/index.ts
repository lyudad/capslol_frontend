import { IAuthRequest, IResponse } from "store/slices/auth/auth.type";
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
  }),
});

export const {
  useCreateUserMutation,
  useLazySignUpUseGoogleQuery,
  useLazySelectRoleQuery,
} = authApi;
