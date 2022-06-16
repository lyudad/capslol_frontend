import { baseApi } from '..';
import {
    IJob,
    ICategory,
    ISkill,
    IUserProfile,
    JobFormType,
} from './jobs.types';

const apiJobsTag = baseApi.enhanceEndpoints({ addTagTypes: ['Jobs'] });

export const jobsApi = apiJobsTag.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<IJob[], string>({
            query: (value) => `jobs${value}`,
            providesTags: ['Jobs'],
        }),

        getJobById: builder.query<IJob, number | undefined>({
            query: (id) => `jobs/getJob?jobId=${id}`,
            providesTags: ['Jobs'],
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
            invalidatesTags: ['Jobs'],
        }),

        getJobsByOwner: builder.query<IJob[], number | undefined>({
            query: (value: number) => ({
                url: `/jobs/searchByOwner?ownerId=${value}`,
            }),
            providesTags: ['Jobs'],
        }),

        archiveToggle: builder.mutation<IJob, number>({
            query: (value: number) => ({
                url: `/jobs/toggle?id=${value}`,
                method: 'PUT',
                invalidatesTags: ['Jobs'],
            }),
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
    useGetJobsByOwnerQuery,
    useArchiveToggleMutation,
    useLazyGetJobsByOwnerQuery,
} = jobsApi;
