import { baseApi } from '..';

export const talentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchTalents: builder.query({
            query: () => ({
                url: 'profiles',
            }),
            providesTags: ['Profile'],
        }),
    }),
});
export const { useSearchTalentsQuery } = talentsApi;
