﻿import { baseApi } from 'store/apis/index';
import {
    IProposal,
    IJob,
    IMyProposal,
    ProposalResponseInterface,
    ProposalOptionsInterface,
} from './proposal.types';

const apiProposalsTag = baseApi.enhanceEndpoints({ addTagTypes: ['Proposal'] });

export const proposalApi = apiProposalsTag.injectEndpoints({
    endpoints: (builder) => ({
        sendProposal: builder.mutation<IMyProposal, IProposal>({
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
                url: `/jobs/${value}`,
            }),
        }),

        getAll: builder.query<IMyProposal, void>({
            query: () => ({
                url: `/proposals`,
            }),
            providesTags: ['Proposal'],
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

        getFilteredProposals: builder.query<
            ProposalResponseInterface,
            ProposalOptionsInterface
        >({
            query: (paginationOptions) => ({
                url: '/proposals/filter',
                params: paginationOptions,
            }),
            providesTags: ['Proposal'],
        }),
    }),
});

export const {
    useSendProposalMutation,
    useGetSingleJobQuery,
    useGetProposalsByFreelancerQuery,
    useGetAllQuery,
    useGetFilteredProposalsQuery,
} = proposalApi;
