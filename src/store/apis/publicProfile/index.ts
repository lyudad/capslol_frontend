import { baseApi } from "..";
import { Profile } from "./publicProfile.types";

export const publicProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query<Profile, number | undefined>({
      query: (profileType) => ({
        url: `profiles/getBiId`,
        params: {
          user: profileType,
        },
      }),
    }),
  }),
});

export const { useSearchUserQuery } = publicProfileApi;
