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
        getContractsByOwner: builder.query<IContract[], number | undefined>({
            query: (value: number) => ({
                url: `/contract/search?ownerId=${value}`,
            }),
            providesTags: ['Contract'],
        }),
        changeContractStatus: builder.mutation<IContract, ICreateContract>({
            query: (body: ICreateContract) => ({
                url: `/contract/changeStatus`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Contract'],
        }),
    }),
});

export const {
    useCreateContractMutation,
    useGetContractsByFreelancerQuery,
    useChangeContractStatusMutation,
    useLazyGetContractsByFreelancerQuery,
    useGetContractsByOwnerQuery,
} = contractsApi;
