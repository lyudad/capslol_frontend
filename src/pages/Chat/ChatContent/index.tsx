/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext, createRef } from 'react';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { colors } from 'constants/index';
import { AppContext } from 'context';
import { useGetUserByIdQuery } from 'store/apis/profile';
import { useGetOfferByJobIdQuery } from 'store/apis/offers';
import { CustomHook } from 'hooks/custom.hooks';
import { Status } from 'store/apis/offers/offers.types';
import { useGetContractByIdOfferIdQuery } from 'store/apis/contracts';
import { useGetInvitationByFreelancerIdQuery } from 'store/apis/invitations';
import Avatar from '../ChatList/Avatar';
import { IMessages, Role, TEmoji, TEvent } from '../interfaces';
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

const ChatContent: React.FC = () => {
    const [messageText, setMessageText] = useState<string>('');
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [messages, setMessages] = useState([] as IMessages[]);
    const [arrivalMessage, setArrivalMessage] = useState({} as IMessages);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const inputRef = createRef<HTMLInputElement>();
    const [emoji, setEmoji] = useState();
    const dispatch = useAppDispatch();
    const { socket, currentChat } = useContext(AppContext);
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    const { data } = useGetUserByIdQuery(user?.id);
    const { data: offer } = useGetOfferByJobIdQuery(
        currentChat?.proposalId?.jobId?.id as number
    );
    const { data: contract } = useGetContractByIdOfferIdQuery(offer?.id);
    const { data: invitation } = useGetInvitationByFreelancerIdQuery(
        currentChat?.proposalId?.freelancerId?.id
    );

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const fetchMessages = async (): Promise<void> => {
        try {
            const { data: m } = await axios.get(
                `${
                    process.env.NODE_ENV === 'development'
                        ? process.env.REACT_APP_DEVELOPMENT_URL
                        : process.env.REACT_APP_SERVER_URL
                }/messages?room=${currentChat?.id}`
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
    }, [arrivalMessage, dispatch, setMessages]);

    const freelancer = currentChat?.proposalId?.freelancerId;
    const jobOwner = currentChat?.proposalId?.jobId?.ownerId;
    const job = currentChat?.proposalId?.jobId;

    const [hourRate, setHourRate] = useState<number>(job?.price as number);

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
                                        ? (jobOwner?.id as number)
                                        : (freelancer?.id as number)
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
                    {messages && (
                        <div>
                            {messages
                                ?.filter(
                                    (member) =>
                                        member?.roomId?.id === currentChat?.id
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
                    )}
                    {showEmojis && <Emoji onEmojiClick={handleEmojiClick} />}
                </ChatBody>
                <ChatFooter>
                    {((data?.data?.role || undefined) !== Role.jobOwner &&
                        !invitation &&
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
                price={job?.price as number}
                hourRate={hourRate}
            />
        </Wrapper>
    );
};

export default ChatContent;
