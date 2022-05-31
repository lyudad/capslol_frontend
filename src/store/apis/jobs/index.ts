import { baseApi } from '..';
import {
    IJob,
    ICategory,
    ISkill,
    IUserProfile,
    JobFormType,
} from './jobs.types';

export const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<IJob[], string>({
            query: (value) => `jobs${value}`,
        }),

        getJobById: builder.query<IJob, number | undefined>({
            query: (id) => `jobs/${id}`,
        }),

        getCategories: builder.query<ICategory[], void>({
            query: () => `categories`,
        }),

        getSkills: builder.query<ISkill[], void>({
            query: () => `skills`,
        }),

        getUserProfile: builder.query<IUserProfile, number | undefined>({
            query: (userId) => `profiles/getByUserId/${userId}`,
        }),
        createJob: builder.mutation<IJob, JobFormType>({
            query: (body) => ({ url: '/jobs', method: 'POST', body }),
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
    useCreateJobMutation,
} = jobsApi;
