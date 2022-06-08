import { baseApi } from 'store/apis/index';
import { IMyInvitation } from './invitations.types';

const apiInvitationsTag = baseApi.enhanceEndpoints({ addTagTypes: ['Offer'] });

export const invitationsApi = apiInvitationsTag.injectEndpoints({
    endpoints: (builder) => ({
        getInvitationsByFreelancer: builder.query<
            IMyInvitation[],
            number | undefined
        >({
            query: (value: number) => ({
                url: `/invitation/getInvitations?freelancerId=${value}`,
            }),
            providesTags: ['Offer'],
        }),
    }),
});

export const { useGetInvitationsByFreelancerQuery } = invitationsApi;
