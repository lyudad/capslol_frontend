import {
    Email,
    IAuthRequest,
    IResponse,
    Password,
    setRole,
} from 'store/slices/auth/auth.type';
import { baseApi } from '..';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation<IResponse, IAuthRequest>({
            query: (credentials) => ({
                url: 'auth/createUser',
                method: 'POST',
                body: {
                    user: credentials,
                },
            }),
        }),
        signUpUseGoogle: builder.query<IResponse, string>({
            query: (tokenId) => ({
                url: 'auth/createUserUseGoogle',
                params: {
                    tokenId,
                },
            }),
        }),
        setRole: builder.query<IResponse, setRole>({
            query: (params) => ({
                url: 'auth/setRole',
                params: {
                    role: params.roleType,
                    userId: params.userId,
                },
            }),
        }),
        confirmEmail: builder.mutation<Email, Email>({
            query: (email) => ({
                url: `auth/forgotPassword`,
                method: 'POST',
                body: email,
            }),
        }),
        resetPassword: builder.mutation<Password, Password>({
            query: (value) => ({
                url: `auth/changePassword?token=${value.token}`,
                method: 'PUT',
                body: { password: value.password },
            }),
        }),
        signInUseGoogle: builder.query<IResponse, string>({
            query: (tokenId) => ({
                url: 'auth/loginUseGoogle',
                params: {
                    tokenId,
                },
            }),
        }),
        login: builder.mutation<IResponse, IAuthRequest>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: {
                    user: credentials,
                },
            }),
        }),
        confirmUserEmail: builder.query<IResponse, string | undefined>({
            query: (token) => ({
                url: `auth/confirmEmail?token=${token}`,
            }),
        }),
    }),
});

export const {
    useCreateUserMutation,
    useLazySignUpUseGoogleQuery,
    useLazySignInUseGoogleQuery,
    useLoginMutation,
    useLazySetRoleQuery,
    useResetPasswordMutation,
    useConfirmEmailMutation,
    useConfirmUserEmailQuery,
} = authApi;
