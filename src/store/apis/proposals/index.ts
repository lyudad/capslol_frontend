import { baseApi } from '..';
import { IProposal, IJob } from './proposal.types';

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
                url: `/jobs/${value}`,
            }),
        }),
    }),
});

export const { useSendProposalMutation, useGetSingleJobQuery } = proposalApi;
