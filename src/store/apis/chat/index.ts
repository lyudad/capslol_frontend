/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessages } from 'pages/Chat/interfaces';
import { baseApi } from '..';
import { IChatContact, IChatMember } from './chat.types';

const apiChatTag = baseApi.enhanceEndpoints({ addTagTypes: ['Users'] });

export const chatApi = apiChatTag.injectEndpoints({
    endpoints: (builder) => ({
        postChatContact: builder.mutation<IChatMember, IChatContact>({
            query(value) {
                return {
                    url: '/chat-contacts',
                    method: 'POST',
                    body: value,
                };
            },
            invalidatesTags: ['Users'],
        }),
        getChatContacts: builder.query<IChatMember[], void>({
            query: () => ({
                url: '/chat-contacts',
            }),
            providesTags: ['Users'],
        }),
        getMessages: builder.query<IMessages, number>({
            query: (value) => ({
                url: `/messages?room=${value}`,
            }),
        }),
        getChatContactsByJobId: builder.query<any, any>({
            query: (value) => ({
                url: `/chat-contacts/getById?jobId=${value}`,
            }),
        }),
    }),
});

export const {
    usePostChatContactMutation,
    useGetChatContactsQuery,
    useGetMessagesQuery,
    useGetChatContactsByJobIdQuery,
} = chatApi;
