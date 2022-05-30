import { baseApi } from '..';
import { IProposal, IJob, IMyProposal } from './proposal.types';

export const proposalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendProposal: builder.mutation<IProposal, IProposal>({
            query(value) {
                return {
                    url: '/proposals',
                    method: 'POST',
                    body: value,
                };
            },
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
        }),
    }),
});

export const {
    useSendProposalMutation,
    useGetSingleJobQuery,
    useGetProposalsByFreelancerQuery,
} = proposalApi;
