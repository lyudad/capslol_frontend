import { talentProfile } from 'pages/TalentsPage/TalentListCard/props';
import { baseApi } from '..';
import { newInvitation } from '../invitations/invitations.types';

export const talentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createInvitation: builder.mutation<
            newInvitation,
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
        getTalentsByQueries: builder.query<talentProfile[], string>({
            query: (value) => `profiles${value}`,
        }),
    }),
});
export const {
    useSearchTalentsQuery,
    useLazyGetTalentsByQueriesQuery,
    useCreateInvitationMutation,
} = talentsApi;
