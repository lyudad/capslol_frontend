import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RequestHeader } from "constants/request.constants";
import { RootState } from "store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      // const token = ( getState() as RootState).authReducer.accessToken;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3ROYW1lIjoiTmV2dSIsImxhc3ROYW1lIjoiQmFyYXQiLCJyb2xlIjoiRnJlZWxhbmNlciIsImVtYWlsIjoiZ2dyZ0BnbWFpbC5jb20iLCJwaG9uZU51bWJlciI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMi0wNS0xMVQxMDowMzo0NC4wMDBaIiwiaXNHb29nbGUiOmZhbHNlLCJpYXQiOjE2NTIyNjM0MjQsImV4cCI6MTY1MjM0OTgyNH0.-gAi-quTCmQ97dSgfObNoFJdjIbQz9B1wURYZQJ5NaU";

      if (token) {
        headers.set(
          RequestHeader.AUTHORIZATION,
          RequestHeader.AUTHORIZATION_PREFIX + token
        );
        headers.set(RequestHeader.ACCESS_CONTROLL_ALLOW_ORIGIN, "*");
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
