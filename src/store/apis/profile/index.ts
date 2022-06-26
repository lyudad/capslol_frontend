import { baseApi } from '..';
import { IPassword, IUser } from './profile.types';

const apiProfileTag = baseApi.enhanceEndpoints({ addTagTypes: ['User'] });

export const profileApi = apiProfileTag.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation<IPassword, IPassword>({
            query(value) {
                const { id, password } = value;
                return {
                    url: `auth/changePasswordWithId/${id}`,
                    method: 'PUT',
                    body: { password },
                };
            },
        }),
        getUserById: builder.query<IUser, number | undefined>({
            query: (value) => ({
                url: `auth/getUser/${value}`,
            }),
            providesTags: ['User'],
        }),
    }),
});

export const { useChangePasswordMutation, useGetUserByIdQuery } = profileApi;
