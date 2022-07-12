﻿import React, { useContext } from 'react';
import { notification } from 'antd';

import Spinner from 'components/Spinner';
import { useAppSelector } from 'hooks/redux';
import { useGetChatContactsQuery } from 'store/apis/chat';
import { IChatMember } from 'store/apis/chat/chat.types';
import { useTranslation } from 'react-i18next';
import { AppContext } from 'context';
import { HideWrapper } from 'components/HideWrapper/styles';
import EmptyListNotification from 'components/EmptyListNotification';
import ChatContent from './ChatContent';
import ChatList from './ChatList';
import { Wrapper } from './styles';
import Welcome from './Welcome';
import { IChatMemberArg } from './interfaces';

const Chat: React.FC = () => {
    const { currentChat } = useContext(AppContext);
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    const { data: chatMembers, isLoading, isError } = useGetChatContactsQuery();

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
        <>
            {' '}
            {userMembers?.length ? (
                <Wrapper>
                    <ChatList members={userMembers} />
                    {currentChat === undefined ? <Welcome /> : <ChatContent />}

                    <>
                        {' '}
                        {isError &&
                            notification.error({
                                message: 'Error!',
                                description: `${t('Chat.membersError')}`,
                            })}
                    </>
                </Wrapper>
            ) : (
                <HideWrapper showWhen={!userMembers?.length}>
                    <EmptyListNotification
                        note={t('Notes.youDon-tHaveChats')}
                    />
                </HideWrapper>
            )}
            {isLoading && <Spinner />}
        </>
    );
};

export default Chat;
