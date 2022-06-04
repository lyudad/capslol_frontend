import { baseApi } from 'store/apis/index';
import { IMyOffer, IChangeStatus } from './offers.types';

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
        }),
    }),
});

export const { useGetOffersByFreelancerQuery, useChangeStatusMutation } =
    offersApi;
