import { baseApi } from '..';
import { IJob, ICategory, ISkill, IUserProfile } from './jobs.types';

export const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<IJob[], string>({
            query: (value) => `jobs${value}`,
        }),

        getJobById: builder.query<IJob, number | undefined>({
            query: (id) => `jobs/${id}`,
        }),

        getCategories: builder.query<ICategory[], string>({
            query: () => `categories`,
        }),

        getSkills: builder.query<ISkill[], string>({
            query: () => `skills`,
        }),

        getUserProfile: builder.query<IUserProfile, number | undefined>({
            query: (userId) => `profiles/getByUserId/${userId}`,
        }),
    }),
});

export const {
    useGetJobsQuery,
    useGetJobByIdQuery,
    useGetCategoriesQuery,
    useGetSkillsQuery,
    useLazyGetJobsQuery,
    useGetUserProfileQuery,
    useLazyGetUserProfileQuery,
} = jobsApi;
