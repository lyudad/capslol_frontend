import React, { useContext, useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';

import { useAppSelector } from 'hooks/redux';
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
    const [members, setMembers] = useState<IChatMember[]>();

    const getRightMembers = (data: IChatMemberArg): IChatMemberArg => {
        const filtered = data?.filter(
            (i: IChatMember) =>
                i?.proposalId?.freelancerId?.id === user?.id ||
                i?.proposalId?.jobId?.ownerId?.id === user?.id
        );
        return filtered;
    };

    const fetchChatMembers = async (): Promise<void> => {
        try {
            const { data: fetchedMembers } = await axios.get(
                `${
                    process.env.NODE_ENV === 'development'
                        ? process.env.REACT_APP_DEVELOPMENT_URL
                        : process.env.REACT_APP_SERVER_URL
                }/chat-contacts`
            );

            setMembers(fetchedMembers);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: `${error?.message}`,
            });
        }
    };

    useEffect(() => {
        fetchChatMembers();
    }, [currentChat]);

    const userMembers = getRightMembers(members);

    return (
        <>
            {' '}
            {userMembers?.length ? (
                <Wrapper>
                    <ChatList members={userMembers} />
                    {currentChat === undefined ? <Welcome /> : <ChatContent />}
                </Wrapper>
            ) : (
                <HideWrapper showWhen={!userMembers?.length}>
                    <EmptyListNotification
                        note={t('Notes.youDon-tHaveChats')}
                    />
                </HideWrapper>
            )}
        </>
    );
};

export default Chat;
