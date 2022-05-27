import { baseApi } from '..';
import { newProfile, Profile, Skills } from './publicProfile.types';

export const publicProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchUser: builder.query<Profile, number | undefined>({
            query: (profileType) => ({
                url: `profiles/getById`,
                params: {
                    user: profileType,
                },
            }),
            providesTags: ['Profile'],
        }),
        createProfile: builder.mutation<newProfile, newProfile | undefined>({
            query: (value) => ({
                url: 'profiles/',
                method: 'POST',
                body: value,
            }),
            invalidatesTags: ['Profile'],
        }),
        getAllSkills: builder.query<Skills[], string>({
            query: () => ({
                url: `skills`,
            }),
        }),
    }),
});

export const {
    useSearchUserQuery,
    useGetAllSkillsQuery,
    useCreateProfileMutation,
} = publicProfileApi;
