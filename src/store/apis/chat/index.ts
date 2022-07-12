import { IMessages } from 'pages/Chat/interfaces';
import { baseApi } from '..';
import { IChatContact, IChatMember, ISearch } from './chat.types';

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
        getChatContactsByJobId: builder.query<IChatMember, ISearch>({
            query: (value) => ({
                url: `/chat-contacts/getById?jobId=${value.jobId}&freelancerId=${value.freelancerId}`,
            }),
            providesTags: ['Users'],
        }),
        getChatContactsByFreelancerId: builder.query<
            IChatMember[],
            number | undefined
        >({
            query: (id) => ({
                url: `/chat-contacts/getChatContacts?byFreelancerId=${id}`,
            }),
            providesTags: ['Users'],
        }),
    }),
});

export const {
    usePostChatContactMutation,
    useGetChatContactsQuery,
    useGetMessagesQuery,
    useGetChatContactsByJobIdQuery,
    useGetChatContactsByFreelancerIdQuery,
} = chatApi;
