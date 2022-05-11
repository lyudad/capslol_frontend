import { IUserData, ILoginFormValues } from '../components/SignInForm/props';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from 'store/index';

export const authApi = createApi({
  reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
          const token = (getState() as any).userReducer.token;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {  
            headers.set('authorization', `Bearer ${token}`)
          };

            return headers
        },
    }),
  endpoints: (builder) => ({

    login: builder.mutation<IUserData, ILoginFormValues>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),

    //=============example=================
    // getUserById: builder.query<IUser, number>({
    //     query: (id) => `/auth/getUser/${id}`,
    // }),


    //===========example==========================
    // addUser: builder.mutation<IUser, any>({
    //   query: (body) => ({
    //     url: "auth/createUser",
    //     method: "POST",
    //     body,
    //   }),
    // }),
  }),
});

export const { useLoginMutation } = authApi;
