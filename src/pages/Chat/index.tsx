import React, { useState } from 'react';
import { message } from 'antd';

import { useGetContactsQuery } from 'store/apis/chat';
import Loader from 'common/Loader/Loader';
import ChatContent from './ChatContent';
import ChatList from './ChatList';
import { Wrapper } from './styles';
import Welcome from './Welcome';
import { TChatArgument } from './interfaces';

const Chat: React.FC = () => {
    const [currentChat, setCurrentChat] = useState<undefined | TChatArgument>(
        undefined
    );
    const { data: contacts, isLoading, isError } = useGetContactsQuery();

    const handleChat = (chat: TChatArgument): void => {
        setCurrentChat(chat);
    };

    return (
        <Wrapper>
            {contacts && (
                <>
                    <ChatList onChangeChat={handleChat} contacts={contacts} />
                    {currentChat === undefined ? (
                        <Welcome />
                    ) : (
                        <ChatContent currentChat={currentChat} />
                    )}
                </>
            )}
            <>
                {isLoading && <Loader />}
                {isError && message.error('Not found any contacts')}
            </>
        </Wrapper>
    );
};

export default Chat;
