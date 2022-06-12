import { baseApi } from 'store/apis/index';
import { IContract, ICreateContract } from './contracts.types';

const apiContractsTag = baseApi.enhanceEndpoints({ addTagTypes: ['Contract'] });

export const contractsApi = apiContractsTag.injectEndpoints({
    endpoints: (builder) => ({
        createContract: builder.mutation<IContract, ICreateContract>({
            query: (body) => ({ url: '/contract', method: 'POST', body }),
            invalidatesTags: ['Contract'],
        }),
        getContractsByFreelancer: builder.query<
            IContract[],
            number | undefined
        >({
            query: (value: number) => ({
                url: `/contract/search?freelancerId=${value}`,
            }),
            providesTags: ['Contract'],
        }),
        // changeStatus: builder.mutation<IMyOffer, number | IChangeStatus>({
        //     query: (body: IChangeStatus) => ({
        //         url: `/offer/changeStatus`,
        //         method: 'PUT',
        //         body,
        //     }),
        //     invalidatesTags: ['Offer'],
        // }),
    }),
});

export const { useCreateContractMutation, useGetContractsByFreelancerQuery } =
    contractsApi;
