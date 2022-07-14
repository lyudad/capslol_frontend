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
import {
    EContractStatus,
    IContract,
} from 'store/apis/contracts/contracts.types';
import { IMyInvitation } from 'store/apis/invitations/invitations.types';
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
    const [contracts, setContracts] = useState<IContract[]>();
    const [invitations, setInvitations] = useState<IMyInvitation[]>();

    const dispatch = useAppDispatch();
    const { socket, currentChat } = useContext(AppContext);
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    const freelancer = currentChat?.proposalId?.freelancerId;
    const jobOwner = currentChat?.proposalId?.jobId?.ownerId;
    const job = currentChat?.proposalId?.jobId;

    const { data } = useGetUserByIdQuery(user?.id);
    const { data: offer } = useGetOfferByJobIdQuery(job?.id as number);

    const openModal = (): void => setIsOpen(true);

    const closeModal = (): void => setIsOpen(false);

    const fetchMessages = async (): Promise<void> => {
        try {
            const { data: m } = await axios.get(
                `${
                    process.env.NODE_ENV === 'development'
                        ? process.env.REACT_APP_DEVELOPMENT_URL
                        : process.env.REACT_APP_SERVER_URL
                }/messages?room=${currentChat?.id as number}`
            );

            setMessages(m);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: `${error?.message}`,
            });
        }
    };

    const fetchContracts = async (): Promise<void> => {
        try {
            const { data: fetchedContracts } = await axios.get(
                `${
                    process.env.NODE_ENV === 'development'
                        ? process.env.REACT_APP_DEVELOPMENT_URL
                        : process.env.REACT_APP_SERVER_URL
                }/contract/getBy?freelancerId=${freelancer?.id as number}`
            );

            setContracts(fetchedContracts);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: `${error?.message}`,
            });
        }
    };

    const fetchInvitations = async (): Promise<void> => {
        try {
            const { data: fetchedContracts } = await axios.get(
                `${
                    process.env.NODE_ENV === 'development'
                        ? process.env.REACT_APP_DEVELOPMENT_URL
                        : process.env.REACT_APP_SERVER_URL
                }/invitation/getInvitation?byFreelancerId=${
                    freelancer?.id as number
                }`
            );

            setInvitations(fetchedContracts);
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
        fetchContracts();
        fetchInvitations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrivalMessage, dispatch, setMessages]);

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

    const handleClosedContract = (
        dataContract: IContract[] | undefined
    ): IContract | undefined => {
        const contract = dataContract?.filter(
            (i) => i?.offerId?.jobId?.id === job?.id
        )[0];

        return contract;
    };

    const handleIsInvitation = (
        datInvitation: IMyInvitation[] | undefined
    ): IMyInvitation | undefined => {
        const invite = datInvitation?.filter(
            (i) => i?.jobId?.id === job?.id
        )[0];

        return invite;
    };

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
                    {(handleIsInvitation(invitations)?.jobId?.id !== job?.id &&
                        (data?.data?.role || undefined) !== Role.jobOwner &&
                        messages.length < 2) ||
                        offer?.status === Status.DECLINED ||
                        handleClosedContract(contracts)?.status ===
                            EContractStatus.closed || (
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
