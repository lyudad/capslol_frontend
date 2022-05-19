import { baseApi } from '..';
import { IJob, ICategory, ISkill } from './jobs.types';

export const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<IJob[], string>({
            query: (value) => `jobs${value}`,
        }),

        getJobById: builder.query<IJob, number | null>({
            query: (id) => `jobs/${id}`,
        }),

        getCategories: builder.query<ICategory[], string>({
            query: () => `categories`,
        }),

        getSkills: builder.query<ISkill[], string>({
            query: () => `skills`,
        }),
    }),
});

export const {
    useGetJobsQuery,
    useGetJobByIdQuery,
    useGetCategoriesQuery,
    useGetSkillsQuery,
    useLazyGetJobsQuery,
} = jobsApi;
