import React, { useState } from 'react';
import { notification } from 'antd';

import Spinner from 'components/Spinner';
import { useAppSelector } from 'hooks/redux';
import { useGetChatContactsQuery } from 'store/apis/chat';
import { IChatMember } from 'store/apis/chat/chat.types';
import { useTranslation } from 'react-i18next';
import ChatContent from './ChatContent';
import ChatList from './ChatList';
import { Wrapper } from './styles';
import Welcome from './Welcome';
import { IChatMemberArg, TChatArgument } from './interfaces';

const Chat: React.FC = () => {
    const [currentChat, setCurrentChat] = useState<undefined | TChatArgument>(
        undefined
    );
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    const { data: chatMembers, isLoading, isError } = useGetChatContactsQuery();

    const handleChat = (chat: TChatArgument): void => {
        setCurrentChat(chat);
    };

    const getRightMembers = (data: IChatMemberArg): IChatMemberArg => {
        const filtered = data?.filter(
            (i: IChatMember) =>
                i?.proposalId?.freelancerId?.id === user?.id ||
                i?.proposalId?.jobId?.ownerId?.id === user?.id
        );
        return filtered;
    };

    const userMembers = getRightMembers(chatMembers);

    return (
        <Wrapper>
            {chatMembers && (
                <>
                    <ChatList onChangeChat={handleChat} members={userMembers} />
                    {currentChat === undefined ? (
                        <Welcome />
                    ) : (
                        <ChatContent currentChat={currentChat} />
                    )}
                </>
            )}
            <>
                {' '}
                {isLoading && <Spinner />}{' '}
                {isError &&
                    notification.error({
                        message: 'Error!',
                        description: `${t('Chat.membersError')}`,
                    })}
            </>
        </Wrapper>
    );
};

export default Chat;
