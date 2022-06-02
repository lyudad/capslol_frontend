import { baseApi } from 'store/apis/index';
import { IMyOffer } from './offers.types';

export const proposalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOffersByFreelancer: builder.query<IMyOffer[], number | undefined>({
            query: (value: number) => ({
                url: `/offer/getOffers?freelancerId=${value}`,
            }),
        }),
    }),
});

export const { useGetOffersByFreelancerQuery } = proposalApi;
