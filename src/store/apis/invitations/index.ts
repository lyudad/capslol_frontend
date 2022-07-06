import { baseApi } from 'store/apis/index';
import {
    InvitationResponseInterface,
    InvitationOptionsInterface,
    IMyInvitation,
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
        getInvitationsByJobOwner: builder.query({
            query: (value: number | undefined) => ({
                url: `/invitation/getInvitationsJb?ownerId=${value}`,
            }),
            providesTags: ['Talents'],
        }),
        getInvitationByFreelancerId: builder.query<
            IMyInvitation,
            number | undefined
        >({
            query: (value) => ({
                url: `/invitation/getInvitation?byFreelancerId=${value}`,
            }),
            providesTags: ['Invitation'],
        }),
    }),
});

export const {
    useGetFilteredInvitationsQuery,
    useGetInvitationsByJobOwnerQuery,
    useGetInvitationByFreelancerIdQuery,
} = invitationsApi;
