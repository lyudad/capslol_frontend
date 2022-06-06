import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApi } from '..';
import {
    Category,
    Educations,
    Experiences,
    newProfile,
    Profile,
    Skills,
} from './publicProfile.types';

export const cloudinaryApi = createApi({
    reducerPath: 'cloudinaryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVER_URL,
    }),
    endpoints: (builder) => ({
        uploadAvatar: builder.mutation({
            query: (newformData) => ({
                url: 'https://api.cloudinary.com/v1_1/da2wlpnon/image/upload/',
                method: 'POST',
                body: newformData,
            }),
        }),
    }),
});

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
        updateProfile: builder.mutation<newProfile, newProfile | undefined>({
            query: (value) => ({
                url: 'profiles/',
                method: 'PATCH',
                body: value,
            }),
            invalidatesTags: ['Profile'],
        }),
        createEducation: builder.mutation<Educations, Educations | undefined>({
            query: (value) => ({
                url: 'educations/',
                method: 'POST',
                body: value,
            }),
            invalidatesTags: ['Profile'],
        }),
        createExperience: builder.mutation<
            Experiences,
            Experiences | undefined
        >({
            query: (value) => ({
                url: 'experiences/',
                method: 'POST',
                body: value,
            }),
            invalidatesTags: ['Profile'],
        }),
        deleteExperience: builder.mutation<{ id: number }, number | undefined>({
            query: (id) => ({
                url: `experiences/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile'],
        }),
        getAllCategories: builder.query<Category[], string>({
            query: () => ({
                url: `categories`,
            }),
        }),
        getAllSkills: builder.query<Skills[], string>({
            query: () => ({
                url: `skills`,
            }),
        }),
        getAllExperience: builder.query<Experiences[], string>({
            query: () => ({
                url: `experiences`,
            }),
            providesTags: ['Profile'],
        }),
    }),
});

export const { useUploadAvatarMutation } = cloudinaryApi;
export const {
    useSearchUserQuery,
    useGetAllSkillsQuery,
    useCreateProfileMutation,
    useCreateExperienceMutation,
    useGetAllCategoriesQuery,
    useCreateEducationMutation,
    useGetAllExperienceQuery,
    useUpdateProfileMutation,
    useDeleteExperienceMutation,
} = publicProfileApi;
