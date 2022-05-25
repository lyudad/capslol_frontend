/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '..';

export const proposalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendProposal: builder.mutation<any, any>({
            query(value) {
                return {
                    url: '/proposals',
                    method: 'POST',
                    body: value,
                };
            },
        }),
        getJobById: builder.query<any, any>({
            query: (value: number) => ({
                url: `/jobs?job=${value}`,
            }),
        }),
    }),
});

export const { useSendProposalMutation, useGetJobByIdQuery } = proposalApi;
