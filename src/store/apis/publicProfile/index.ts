import { baseApi } from "..";
import {
  Educations,
  Experiences,
  Profile,
  Skillls,
} from "./publicProfile.types";

export const publicProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query<Profile, number | undefined>({
      query: (profileType) => ({
        url: `profiles/getById`,
        params: {
          user: profileType,
        },
      }),
    }),
    searchExperience: builder.query<Experiences, number | undefined>({
      query: (id) => ({
        url: `experiences/${id}`,
      }),
    }),
    searchEducations: builder.query<Educations, number | undefined>({
      query: (id) => ({
        url: `educations/${id}`,
      }),
    }),
    searchSkills: builder.query<Skillls, number | undefined>({
      query: (id) => ({
        url: `skills/${id}`,
      }),
    }),
  }),
});

export const {
  useSearchUserQuery,
  useSearchExperienceQuery,
  useSearchEducationsQuery,
  useSearchSkillsQuery,
} = publicProfileApi;
