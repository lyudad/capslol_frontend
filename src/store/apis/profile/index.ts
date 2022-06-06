import { baseApi } from '..';
import { IPassword, IUserValue, IUser } from './profile.types';

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
        editUserValue: builder.mutation<IUserValue, IUserValue>({
            query(value) {
                return {
                    url: `auth/updateUser/${value.id}`,
                    method: 'PUT',
                    body: { user: value },
                };
            },
            invalidatesTags: ['User'],
        }),
        getUserById: builder.query<IUser, number | undefined>({
            query: (value) => ({
                url: `auth/getUser/${value}`,
            }),
            providesTags: ['User'],
        }),
    }),
});

export const {
    useChangePasswordMutation,
    useEditUserValueMutation,
    useGetUserByIdQuery,
} = profileApi;
