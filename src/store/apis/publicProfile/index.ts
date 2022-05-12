import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicProfileApi = createApi({
  reducerPath: "profile",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,

    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    searchUser: builder.query({
      query: (profileType) => ({
        url: `profiles`,
        params: {
          user: profileType,
        },
      }),
    }),
  }),
});

export const { useSearchUserQuery } = publicProfileApi;
