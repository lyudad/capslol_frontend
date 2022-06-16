import { baseApi } from 'store/apis/index';
import { IMyOffer, IChangeStatus, ICreateOffer } from './offers.types';

const apiOffersTag = baseApi.enhanceEndpoints({ addTagTypes: ['Offer'] });

export const offersApi = apiOffersTag.injectEndpoints({
    endpoints: (builder) => ({
        getOffersByFreelancer: builder.query<IMyOffer[], number | undefined>({
            query: (value: number) => ({
                url: `/offer/getOffers?freelancerId=${value}`,
            }),
            providesTags: ['Offer'],
        }),
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
        getOfferById: builder.query<IMyOffer, number | undefined>({
            query: (id) => ({
                url: `offer/getById/${id}`,
            }),
        }),
    }),
});

export const {
    useGetOffersByFreelancerQuery,
    useChangeStatusMutation,
    useCreateOfferMutation,
    useGetOfferByIdQuery,
} = offersApi;
