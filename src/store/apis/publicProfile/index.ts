import { baseApi } from '..';
import { Profile, Skills } from './publicProfile.types';

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
        getAllSkills: builder.query<Skills[], string>({
            query: () => ({
                url: `skills`,
            }),
        }),
    }),
});

export const { useSearchUserQuery, useGetAllSkillsQuery } = publicProfileApi;
