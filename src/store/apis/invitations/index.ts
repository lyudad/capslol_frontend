import { baseApi } from 'store/apis/index';
import {
    InvitationResponseInterface,
    InvitationOptionsInterface,
} from './invitations.types';

const apiInvitationsTag = baseApi.enhanceEndpoints({
    addTagTypes: ['Invitation'],
});

export const invitationsApi = apiInvitationsTag.injectEndpoints({
    endpoints: (builder) => ({
        getFilteredInvitations: builder.query<
            InvitationResponseInterface,
            InvitationOptionsInterface
        >({
            query: (paginationOptions) => ({
                url: '/invitation/filter',
                params: paginationOptions,
            }),
            providesTags: ['Invitation'],
        }),
    }),
});

export const { useGetFilteredInvitationsQuery } = invitationsApi;
