import { baseApi } from '..';
import { IJobs, ICategory, ISkill } from './jobs.types';

export const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<IJobs[], string>({
            query: () => `jobs`,
        }),

        getJobById: builder.query<IJobs, number>({
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
} = jobsApi;
