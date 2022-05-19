import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

import { useAppSelector } from 'hooks/redux';
import Avatar from '../ChatList/Avatar';
import { IChatContentProps, IMessages } from '../interfaces';
import ChatItem from './ChatItem';
import {
    ChatBody,
    ChatFooter,
    ChatHeader,
    CurrentChatUser,
    MainChat,
    Project,
    ProjectOwner,
    SendNewMessage,
    SendNewMessageBtn,
    SendNewMessageIcon,
    SendNewMessageIconPlus,
    SendNewMessageInput,
    SettingsBtn,
    Wrapper,
} from './styles';

const ChatContent: React.FC<IChatContentProps> = ({ currentChat }) => {
    const [messages, setMessages] = useState<IMessages[]>([]);
    const [messageText, setMessageText] = useState<string>('');
    const { user } = useAppSelector((s) => s.authReducer);

    const handleMessage = async (): Promise<void> => {
        try {
            const newMessage = {
                sender: {
                    pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
                    id: user?.id || 1,
                    name: `${user?.firstName} ${user?.lastName}`,
                },
                content: messageText,
                chat: currentChat.id,
            };
            await axios.post(`http://localhost:3002/messages`, newMessage);
            setMessageText('');
        } catch (e) {
            message.error('Something went wrong, please try again');
        }
    };

    const fetchMessages = async (): Promise<void> => {
        try {
            const { data } = await axios.get('http://localhost:3002/messages');
            setMessages(data);
        } catch (e) {
            message.error('Not Found, we coudn`\t get messages');
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [currentChat]);

    return (
        <Wrapper>
            <MainChat>
                <ChatHeader>
                    <div>
                        <CurrentChatUser>
                            <Avatar
                                isOnline="active"
                                image={currentChat.image}
                                alt={currentChat.name}
                            />
                            <div>
                                <ProjectOwner>{currentChat.name}</ProjectOwner>
                                <Project>{currentChat.project}</Project>
                            </div>
                        </CurrentChatUser>
                    </div>

                    <div>
                        <SettingsBtn>
                            <span>...</span>
                        </SettingsBtn>
                    </div>
                </ChatHeader>
                <ChatBody>
                    <div>
                        {messages
                            .filter(
                                (contact) => contact.chat === currentChat.id
                            )
                            .map((msg, index) => {
                                return (
                                    <ChatItem
                                        animationDelay={index + 2}
                                        key={msg.id}
                                        msg={msg}
                                    />
                                );
                            })}
                    </div>
                </ChatBody>
                <ChatFooter>
                    <SendNewMessage>
                        <SendNewMessageBtn>
                            <SendNewMessageIconPlus />
                        </SendNewMessageBtn>
                        <SendNewMessageInput
                            value={messageText}
                            type="text"
                            placeholder="Write a message..."
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <SendNewMessageBtn onClick={handleMessage}>
                            <SendNewMessageIcon />
                        </SendNewMessageBtn>
                    </SendNewMessage>
                </ChatFooter>
            </MainChat>
        </Wrapper>
    );
};

export default ChatContent;
