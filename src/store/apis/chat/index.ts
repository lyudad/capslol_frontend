import { IChatOffer, IChatUser, IMessages } from 'pages/Chat/interfaces';
import { baseApi } from '..';

const apiWithTag = baseApi.enhanceEndpoints({
    addTagTypes: ['Contact', 'Offer', 'Message'],
});

export const chatApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query<IChatUser[], void>({
            query: () => '/contacts',
            providesTags: ['Contact'],
        }),
        getOffers: builder.query<IChatOffer[], void>({
            query: () => '/offers',
            providesTags: ['Offer'],
        }),
        getSingleOffer: builder.query<IChatOffer, number>({
            query: (id: number) => `/offers/${id}`,
        }),
        getMessages: builder.query<IMessages[], void>({
            query: () => '/messages',
            providesTags: ['Message'],
        }),
        postMessage: builder.mutation<IMessages, IMessages>({
            query: (message) => ({
                url: '/messages',
                method: 'POST',
                body: message,
            }),
            invalidatesTags: ['Message'],
        }),
        postOffer: builder.mutation<IChatOffer, IChatOffer>({
            query: (offer) => ({
                url: '/offers',
                method: 'POST',
                body: offer,
            }),
            invalidatesTags: ['Offer'],
        }),
        postContacts: builder.mutation<IChatUser, IChatUser>({
            query: (contacts) => ({
                url: '/contacts',
                method: 'POST',
                body: contacts,
            }),
            invalidatesTags: ['Contact'],
        }),
        deleteOfferById: builder.mutation<IChatOffer, number>({
            query: (id: number) => ({
                url: `/offers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Offer'],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useGetMessagesQuery,
    useGetOffersQuery,
    usePostMessageMutation,
    usePostOfferMutation,
    useGetSingleOfferQuery,
    usePostContactsMutation,
    useDeleteOfferByIdMutation,
} = chatApi;
