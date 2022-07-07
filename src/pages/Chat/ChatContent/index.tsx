/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext, createRef } from 'react';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { colors } from 'constants/index';
import axios from 'axios';
import { AppContext } from 'context';
import { useGetUserByIdQuery } from 'store/apis/profile';
import { useGetOfferByJobIdQuery } from 'store/apis/offers';
import { CustomHook } from 'hooks/custom.hooks';
import { Status } from 'store/apis/offers/offers.types';
import { useGetContractByIdOfferIdQuery } from 'store/apis/contracts';
import { setMessagesCount } from 'store/slices/auth/auth.slice';
import Avatar from '../ChatList/Avatar';
import {
    IChatContentProps,
    IMessages,
    Role,
    TEmoji,
    TEvent,
} from '../interfaces';
import ChatItem from './ChatItem';
import {
    ChatBody,
    ChatFooter,
    ChatHeader,
    CurrentChatUser,
    MainChat,
    Project,
    ProjectOwner,
    SettingsBtn,
    Wrapper,
} from './styles';
import ChatWindow from './ChatWindow';
import Emoji from './Emoji';
import ChatForm from './ChatForm';

const ChatContent: React.FC<IChatContentProps> = ({ currentChat }) => {
    const [messageText, setMessageText] = useState<string>('');
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [messages, setMessages] = useState([] as IMessages[]);
    const [arrivalMessage, setArrivalMessage] = useState({} as IMessages);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const inputRef = createRef<HTMLInputElement>();
    const [emoji, setEmoji] = useState();
    const dispatch = useAppDispatch();
    const { socket } = useContext(AppContext);
    const { user } = useAppSelector((s) => s.auth);
    // const userId = useAppSelector((s) => s.auth.user?.id);

    console.log('USER_ID: ', user?.id);
    // const userId = user?.id;
    const { t } = useTranslation();

    const { data } = useGetUserByIdQuery(user?.id);
    const { data: offer } = useGetOfferByJobIdQuery(
        currentChat?.proposalId?.jobId?.id
    );
    const { data: contract } = useGetContractByIdOfferIdQuery(offer?.id);

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const fetchMessages = async (): Promise<void> => {
        try {
            const { data: m } = await axios.get(
                `${
                    process.env.NODE_ENV === 'development'
                        ? process.env.REACT_APP_DEVELOPMENT_URL
                        : process.env.REACT_APP_SERVER_URL
                }/messages?room=${currentChat.id}`
            );

            setMessages(m);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: `${error?.message}`,
            });
        }
    };

    const messagesCount = useAppSelector(
        (state) => state.auth.counts.messagesCount
    );

    console.log('COUNT: ', messagesCount);

    useEffect(() => {
        fetchMessages();

        socket.on(`msgToClient`, (response: IMessages) => {
            if (response.senderId.id !== user?.id) {
                console.log('RESPONSE: ', response, user?.id);
                dispatch(setMessagesCount(messagesCount + 1));
            }

            setArrivalMessage(response);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChat, user, messagesCount]);

    useEffect(() => {
        arrivalMessage &&
            setMessages((prev: IMessages[]) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    // useEffect(() => {
    //     if (arrivalMessage) {
    //         setMessages((prev: IMessages[]) => [...prev, arrivalMessage]);
    //     }
    //     if (arrivalMessage) {
    //         console.log(
    //             'ARRIVA_MESS#1: ',
    //             arrivalMessage,
    //             'SENDER_ID: ',
    //         );
    //     }
    // }, [arrivalMessage]);

    const freelancer = currentChat?.proposalId?.freelancerId;
    const jobOwner = currentChat?.proposalId?.jobId?.ownerId;
    const job = currentChat?.proposalId?.jobId;

    const [hourRate, setHourRate] = useState<number>(job?.price);

    const handleHourRateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newValue = event.target.value;
        setHourRate(+newValue);
    };

    const handleShowEmojis = (): void => {
        inputRef?.current?.focus();
        setShowEmojis(!showEmojis);
    };

    const handleEmojiClick = (event: TEvent, emojiObject: TEmoji): void => {
        inputRef?.current?.focus();
        setEmoji(emojiObject.emoji);
    };

    CustomHook({ setMessageText, emoji });

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
                        {(data?.data?.role || undefined) === Role.jobOwner &&
                            (offer?.status === Status.PENDING ||
                                offer?.status === Status.ACCEPTED || (
                                    <SettingsBtn
                                        onClick={openModal}
                                        bg={colors.proposalGreen}
                                        color={colors.textWhite}
                                    >
                                        {t('Chat.jobOffer')}
                                    </SettingsBtn>
                                ))}
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
                    {showEmojis && <Emoji onEmojiClick={handleEmojiClick} />}
                </ChatBody>
                <ChatFooter>
                    {((data?.data?.role || undefined) !== Role.jobOwner &&
                        messages.length < 2) ||
                        offer?.status === Status.DECLINED ||
                        contract?.status === 'closed' || (
                            <ChatForm
                                currentChat={currentChat}
                                handleShowEmojis={handleShowEmojis}
                                inputRef={inputRef}
                                setMessageText={setMessageText}
                                messageText={messageText}
                            />
                        )}
                </ChatFooter>
            </MainChat>

            <ChatWindow
                modalIsOpen={modalIsOpen}
                currentChat={currentChat}
                closeModal={closeModal}
                handleHourRateChange={handleHourRateChange}
                price={job?.price}
                hourRate={hourRate}
            />
        </Wrapper>
    );
};

export default ChatContent;
