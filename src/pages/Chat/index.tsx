/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import { useGetContactsQuery } from 'store/apis/chat';
import Spinner from 'components/Spinner';
import axios from 'axios';
import ChatContent from './ChatContent';
import ChatList from './ChatList';
import { Wrapper } from './styles';
import Welcome from './Welcome';
import { TChatArgument } from './interfaces';
// import { contacts } from './ChatList/data';

const Chat: React.FC = () => {
    const [currentChat, setCurrentChat] = useState<undefined | TChatArgument>(
        undefined
    );

    const [contacts, setContacts] = useState();
    // const { data: contacts, isLoading, isError } = useGetContactsQuery();

    const handleChat = (chat: TChatArgument): void => {
        setCurrentChat(chat);
    };

    const fetchContacts = async (): Promise<void> => {
        try {
            const { data } = await axios.get(
                'http://localhost:3000/chat-contacts'
            );
            setContacts(data);
        } catch (error) {
            message.error(`${error?.data?.message}`);
        }
    };

    useEffect(() => {
        fetchContacts();
        console.log(contacts);
    }, []);

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
                {/* {isLoading && <Spinner />} */}
                {/* {isError && message.error('Not found any contacts')} */}
            </>
        </Wrapper>
    );
};

export default Chat;
