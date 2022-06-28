import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RequestHeader } from 'constants/request.constants';
import { RootState } from 'store';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Profile', 'Talents'],
    baseQuery: fetchBaseQuery({
        baseUrl:
            process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_DEVELOPMENT_URL
                : process.env.REACT_APP_SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set(
                    RequestHeader.AUTHORIZATION,
                    RequestHeader.AUTHORIZATION_PREFIX + token
                );
                headers.set(RequestHeader.ACCESS_CONTROLL_ALLOW_ORIGIN, '*');
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});
