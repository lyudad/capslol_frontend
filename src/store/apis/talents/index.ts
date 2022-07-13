import { Italents } from 'pages/TalentsPage/TalentListCard/props';
import { baseApi } from '..';
import { IMyInvitation, newInvitation } from '../invitations/invitations.types';

export const talentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createInvitation: builder.mutation<
            IMyInvitation,
            newInvitation | undefined
        >({
            query: (value) => ({
                url: 'invitation/',
                method: 'POST',
                body: value,
            }),
            invalidatesTags: ['Talents'],
        }),
        searchTalents: builder.query({
            query: () => ({
                url: 'profiles',
            }),
            providesTags: ['Talents'],
        }),
        getTalentsByQueries: builder.query<Italents, string>({
            query: (value) => `profiles/search-talens?${value}`,
            providesTags: ['Talents'],
        }),
    }),
});
export const {
    useSearchTalentsQuery,
    useLazyGetTalentsByQueriesQuery,
    useCreateInvitationMutation,
} = talentsApi;
