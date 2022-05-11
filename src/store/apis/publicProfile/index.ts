import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicProfileApi = createApi({
  reducerPath: "profile",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_URL }),
  endpoints: (builder) => ({
    searchUser: builder.query({
      query: () => ``,
    }),
  }),
});
