import { baseApi } from 'store/apis/index';
import {
    ContractResponseInterface,
    IContract,
    ICreateContract,
    ContractsOptionsInterface,
} from './contracts.types';

const apiContractsTag = baseApi.enhanceEndpoints({ addTagTypes: ['Contract'] });

export const contractsApi = apiContractsTag.injectEndpoints({
    endpoints: (builder) => ({
        createContract: builder.mutation<IContract, ICreateContract>({
            query: (body) => ({ url: '/contract', method: 'POST', body }),
            invalidatesTags: ['Contract'],
        }),

        changeContractStatus: builder.mutation<IContract, ICreateContract>({
            query: (body: ICreateContract) => ({
                url: `/contract/changeStatus`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Contract'],
        }),
        getFilteredContracts: builder.query<
            ContractResponseInterface,
            ContractsOptionsInterface
        >({
            query: (paginationOptions) => ({
                url: '/contract/filter',
                params: paginationOptions,
            }),
            providesTags: ['Contract'],
        }),
    }),
});

export const {
    useCreateContractMutation,
    useChangeContractStatusMutation,
    useGetFilteredContractsQuery,
    useLazyGetFilteredContractsQuery,
} = contractsApi;
