import { talentProfile } from 'pages/TalentsPage/TalentListCard/props';
import { baseApi } from '..';

export const talentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchTalents: builder.query({
            query: () => ({
                url: 'profiles',
            }),
            providesTags: ['Profile'],
        }),
        getTalentsByQueries: builder.query<talentProfile[], string>({
            query: (value) => `profiles${value}`,
        }),
    }),
});
export const { useSearchTalentsQuery, useLazyGetTalentsByQueriesQuery } =
    talentsApi;
