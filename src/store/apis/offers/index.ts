import { baseApi } from 'store/apis/index';
import {
    IMyOffer,
    IChangeStatus,
    ICreateOffer,
    OfferResponseInterface,
    OfferOptionsInterface,
} from './offers.types';

const apiOffersTag = baseApi.enhanceEndpoints({ addTagTypes: ['Offer'] });

export const offersApi = apiOffersTag.injectEndpoints({
    endpoints: (builder) => ({
        changeStatus: builder.mutation<IMyOffer, number | IChangeStatus>({
            query: (body: IChangeStatus) => ({
                url: `/offer/changeStatus`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Offer'],
        }),
        createOffer: builder.mutation<IMyOffer, ICreateOffer>({
            query: (body) => ({
                url: `/offer`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Offer'],
        }),

        getOfferByJobId: builder.query<IMyOffer, number>({
            query: (value) => ({
                url: `/offer/getByJobId?jobId=${value}`,
            }),
            providesTags: ['Offer'],
        }),

        getFilteredOffers: builder.query<
            OfferResponseInterface,
            OfferOptionsInterface
        >({
            query: (paginationOptions) => ({
                url: '/offer/filter',
                params: paginationOptions,
            }),
            providesTags: ['Offer'],
        }),
    }),
});

export const {
    useChangeStatusMutation,
    useCreateOfferMutation,
    useGetOfferByJobIdQuery,
    useGetFilteredOffersQuery,
} = offersApi;
