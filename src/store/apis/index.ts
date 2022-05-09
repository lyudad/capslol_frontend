import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store";



export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.accessToken

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Access-Control-Allow-Origin", "*");
      }

      return headers;
    },
  }),
  endpoints: () => ({})
})
