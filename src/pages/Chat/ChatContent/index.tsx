/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import { message, notification } from 'antd';

import { useAppSelector } from 'hooks/redux';
import { colors } from 'constants/index';
import axios from 'axios';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import { AppContext } from 'context';
import { useGetUserByIdQuery } from 'store/apis/profile';
import { useTranslation } from 'react-i18next';
import Avatar from '../ChatList/Avatar';
import { IChatContentProps, IMessages, Role } from '../interfaces';
import ChatItem from './ChatItem';
import {
    ChatBody,
    ChatFooter,
    ChatHeader,
    CurrentChatUser,
    HourlyRateInput,
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

const ChatContent: React.FC<IChatContentProps> = ({ currentChat }) => {
    const [messageText, setMessageText] = useState<string>('');
    const [messages, setMessages] = useState([] as IMessages[]);
    const [arrivalMessage, setArrivalMessage] = useState({} as IMessages);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const { socket } = useContext(AppContext);
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    const { data } = useGetUserByIdQuery(user?.id);

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const handleMessage = async (): Promise<void> => {
        try {
            const newMessage = {
                content: messageText,
                senderId: user?.id,
                roomId: currentChat.id,
            };
            socket.emit('msgToServer', newMessage, () => {
                setMessageText('');
            });
        } catch (error) {
            message.error(error?.message);
        }
    };

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newValue = event.currentTarget.value;
        setMessageText(newValue);
    };

    const fetchMessages = async (): Promise<void> => {
        try {
            const { data: m } = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/messages?room=${currentChat.id}`
            );
            setMessages(m);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: `${error?.message}`,
            });
        }
    };

    useEffect(() => {
        fetchMessages();

        socket.on(`msgToClient`, (response: IMessages) => {
            setArrivalMessage(response);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChat]);

    useEffect(() => {
        arrivalMessage &&
            setMessages((prev: IMessages[]) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    const freelancer = currentChat?.proposalId?.freelancerId;
    const jobOwner = currentChat?.proposalId?.jobId?.ownerId;
    const job = currentChat?.proposalId?.jobId;

    return (
        <Wrapper>
            <MainChat>
                <ChatHeader>
                    <div>
                        <CurrentChatUser>
                            <Avatar
                                id={
                                    freelancer?.id === user?.id
                                        ? jobOwner?.id
                                        : freelancer?.id
                                }
                            />
                            <div>
                                <ProjectOwner>
                                    {freelancer?.id === user?.id
                                        ? `${jobOwner?.firstName} ${jobOwner?.lastName}`
                                        : `${freelancer?.firstName} ${freelancer?.lastName}`}
                                </ProjectOwner>
                                <Project>{job?.title}</Project>
                            </div>
                        </CurrentChatUser>
                    </div>

                    <div>
                        {(data?.data?.role || undefined) === Role.jobOwner && (
                            <SettingsBtn onClick={openModal}>
                                {t('Chat.jobOffer')}
                            </SettingsBtn>
                        )}
                    </div>
                </ChatHeader>
                <ChatBody>
                    <div>
                        {messages
                            .filter(
                                (member) =>
                                    member?.roomId?.id === currentChat.id
                            )
                            .map((memberMessage, index: number) => {
                                return (
                                    <ChatItem
                                        animationDelay={index + 2}
                                        key={memberMessage?.id}
                                        msg={memberMessage}
                                    />
                                );
                            })}
                    </div>
                </ChatBody>
                <ChatFooter>
                    <SendNewMessage>
                        <SendNewMessageInput
                            value={messageText}
                            type="text"
                            placeholder={`${t('Chat.sendMsgPlaceholder')}`}
                            onChange={handleOnChange}
                        />
                        <SendNewMessageBtn onClick={handleMessage}>
                            <SendNewMessageIcon />
                        </SendNewMessageBtn>
                    </SendNewMessage>
                </ChatFooter>
            </MainChat>

            <ModalWindow
                modalIsOpen={modalIsOpen}
                closeModal={() => closeModal()}
                bg={colors.btnWhite}
                modalBg={colors.bgBlack}
            >
                <HourlyRateInput
                    placeholder={`${t('Chat.offerSentPlaceholder')}`}
                />
            </ModalWindow>
        </Wrapper>
    );
};

export default ChatContent;
