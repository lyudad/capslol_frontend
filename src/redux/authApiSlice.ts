import { IUser } from "./reducers/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const authApi = createApi({
  reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
        prepareHeaders: (headers, { getState }) => {
          const token = (getState() as RootState).userReducer.token;
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {  
            headers.set('authorization', `Bearer ${token}`)
          };

            return headers
        },
    }),
  endpoints: (builder) => ({

    login: builder.mutation<IUser, any>({
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
