import { baseApi } from 'store/apis/index';
import { IProposal, IJob, IMyProposal } from './proposal.types';

const apiProposalsTag = baseApi.enhanceEndpoints({ addTagTypes: ['Proposal'] });

export const proposalApi = apiProposalsTag.injectEndpoints({
    endpoints: (builder) => ({
        sendProposal: builder.mutation<IProposal, IProposal>({
            query(value) {
                return {
                    url: '/proposals',
                    method: 'POST',
                    body: value,
                };
            },
            invalidatesTags: ['Proposal'],
        }),
        getSingleJob: builder.query<IJob, number | undefined>({
            query: (value: number) => ({
                url: `/jobs/getbyid?job=${value}`,
            }),
        }),
        getProposalsByFreelancer: builder.query<
            IMyProposal[],
            number | undefined
        >({
            query: (value: number) => ({
                url: `/proposals/search?freelancerId=${value}`,
            }),
            providesTags: ['Proposal'],
        }),
    }),
});

export const {
    useSendProposalMutation,
    useGetSingleJobQuery,
    useGetProposalsByFreelancerQuery,
} = proposalApi;
