import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import ChatContent from './ChatContent';
import ChatList from './ChatList';
import { Wrapper } from './styles';
import Welcome from './Welcome';
import { IChatUser, TChatArgument } from './interfaces';

const Chat: React.FC = () => {
    const [currentChat, setCurrentChat] = useState<undefined | TChatArgument>(
        undefined
    );
    const [contacts, setContacts] = useState<IChatUser[]>([]);

    const fetchContacts = async (): Promise<void> => {
        try {
            const { data } = await axios.get(`http://localhost:3002/contacts`);
            setContacts(data);
        } catch (e) {
            message.error('Not Found, we coudn`\t get a contacts');
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [currentChat]);

    const handleChat = (chat: TChatArgument): void => {
        setCurrentChat(chat);
    };

    return (
        <Wrapper>
            <ChatList onChangeChat={handleChat} contacts={contacts} />
            {currentChat === undefined ? (
                <Welcome />
            ) : (
                <ChatContent currentChat={currentChat} />
            )}
        </Wrapper>
    );
};

export default Chat;
