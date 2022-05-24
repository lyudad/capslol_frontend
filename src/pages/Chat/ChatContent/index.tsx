import React, { useState } from 'react';
import { message } from 'antd';

import { useAppSelector } from 'hooks/redux';
import { useGetMessagesQuery, usePostMessageMutation } from 'store/apis/chat';
import Loader from 'common/Loader/Loader';
import Avatar from '../ChatList/Avatar';
import { IChatContentProps } from '../interfaces';
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
    const [messageText, setMessageText] = useState<string>('');
    const { user } = useAppSelector((s) => s.authReducer);

    const {
        data: messages,
        isLoading,
        isError: msgIsError,
    } = useGetMessagesQuery();
    const [postMessage, { isError }] = usePostMessageMutation();

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
            await postMessage(newMessage);
            setMessageText('');
        } catch (e) {
            message.error(e?.data?.message);
        }
    };

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const newValue = e.currentTarget.value;
        setMessageText(newValue);
    };

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
                    )}
                    <>
                        {isLoading && <Loader />}
                        {msgIsError &&
                            message.error(
                                'Something went wrong, messages not found'
                            )}
                    </>
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
                    <> {isError && message.error('Message not send')}</>
                </ChatFooter>
            </MainChat>
        </Wrapper>
    );
};

export default ChatContent;
