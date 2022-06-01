/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable no-useless-return */
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import io, { Socket } from 'socket.io-client';

import { useAppSelector } from 'hooks/redux';
import { useGetMessagesQuery, usePostMessageMutation } from 'store/apis/chat';
import { Img } from 'constants/index';
import Spinner from 'components/Spinner';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DefaultEventsMap } from '@socket.io/component-emitter';
import Avatar from '../ChatList/Avatar';
import { IChatContentProps, IChatUser } from '../interfaces';
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
    SendNewMessageInput,
    SettingsBtn,
    Wrapper,
} from './styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var socket: Socket<DefaultEventsMap, DefaultEventsMap>;
var selectedChatCompare: IChatUser;

const ChatContent: React.FC<IChatContentProps> = ({ currentChat }) => {
    const [messageText, setMessageText] = useState<string>('');
    const { user } = useAppSelector((s) => s.auth);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([] as any);
    const [notification, setNotification] = useState([] as any);
    const [joined, setJoined] = useState(false);

    const handleMessage = async (): Promise<void> => {
        try {
            const newMessage = {
                senderId: user?.id,
                content: messageText,
                roomId: currentChat.id,
            };
            socket.emit('msgToServer', newMessage, () => {
                setMessageText('');
            });
        } catch (error) {
            message.error(error?.message);
        }
    };

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const newValue = e.currentTarget.value;
        setMessageText(newValue);
    };

    const handleJoined = () => {
        // socket.emit('join_room', currentChat.id, () => {
        //     setJoined(true);
        // });
    };

    const handleTyping = () => {
        // socket.emit('typing', { isTyping: true }, () => {
        //     setJoined(true);
        // });
    };

    const fetchMessages = async (): Promise<void> => {
        if (!currentChat) return;

        try {
            const { data } = await axios.get(
                `http://localhost:3000/messages/getByChatId?chat=${currentChat.id}`
            );
            // setMessages(data);
            // socket.emit('join_room', currentChat.id);
        } catch (error) {
            message.error(`${error?.message}`);
        }
    };

    useEffect(() => {
        // socket = io('http://localhost:3000');
        // socket.on('connected', () => setSocketConnected(true));
        // socket.on('typing', () => setIsTyping(true));
        // socket.on('stop typing', () => setIsTyping(false));
        selectedChatCompare = currentChat;
    }, []);

    useEffect(() => {
        // socket.emit(`findAllMessage`, {}, (response: any) => {
        //     setMessages(response);
        // });
        // socket.on(`msgToClient`, (response: any) => {
        //     setMessages([...messages, response]);
        // });
    });

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
                    {messages && (
                        <div>
                            {messages
                                // .filter(
                                //     (contact: any) =>
                                //         contact.chat === currentChat.id
                                // )
                                .map((msg: any, index: number) => {
                                    return (
                                        <ChatItem
                                            animationDelay={index + 2}
                                            key={msg?.id}
                                            msg={msg}
                                        />
                                    );
                                })}
                        </div>
                    )}
                    {/* <>
                      {isLoading && <Spinner />}
                      {msgIsError &&
                          message.error(
                              'Something went wrong, messages not found'
                          )}
                  </> */}
                </ChatBody>
                <ChatFooter>
                    <SendNewMessage>
                        <SendNewMessageInput
                            value={messageText}
                            type="text"
                            placeholder="Write a message..."
                            onChange={handleOnChange}
                        />
                        <SendNewMessageBtn onClick={handleMessage}>
                            <SendNewMessageIcon />
                        </SendNewMessageBtn>
                    </SendNewMessage>
                    {/* <> {isError && message.error('Message not send')}</> */}
                </ChatFooter>
            </MainChat>
        </Wrapper>
    );
};

export default ChatContent;
