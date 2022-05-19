import React, { useState } from 'react';
import { message, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePostOfferMutation } from 'store/apis/chat';
import Avatar from './Avatar';
import {
    ChatListItem,
    ChatLists,
    ChatProject,
    ChatUser,
    ChatUserTime,
    Input,
    SearchWrap,
    Wrapper,
    StyledRow,
} from './styles';
import { IChatListProps, TChatArgument } from '../interfaces';

const ChatList: React.FC<IChatListProps> = ({ onChangeChat, contacts }) => {
    const [currentSelected, setCurrentSelected] = useState<number>();
    const { t } = useTranslation();

    const [postOffer, { isError }] = usePostOfferMutation();

    const changeChat = (id: number, chat: TChatArgument): void => {
        setCurrentSelected(id);
        onChangeChat(chat);
    };

    const handleNotification = async (): Promise<void> => {
        const newOffer = {
            sender: {
                name: 'Ali',
                id: Date.now(),
                project: 'Create UI Chat',
            },
            to: {
                name: 'Jon',
                id: 1,
            },
            message: 'We are interested you',
            messageType: 'Offer',
        };
        try {
            await postOffer(newOffer);
        } catch (e) {
            message.error(e?.data?.message);
        }
    };

    return (
        <Wrapper>
            <SearchWrap>
                <Input type="text" placeholder="Search" />
            </SearchWrap>
            <Row justify="center">
                <button type="button" onClick={handleNotification}>
                    {t('Chat.offerBtnText')}
                </button>
            </Row>
            <ChatLists>
                {contacts.map((contact, index: number) => {
                    return (
                        <ChatListItem
                            key={contact.id}
                            style={{ animationDelay: `0.${index + 1}s` }}
                            className={`${
                                contact.id === currentSelected ? 'active' : ''
                            } `}
                            onClick={() => changeChat(contact.id, contact)}
                        >
                            <Avatar
                                image={
                                    contact.image
                                        ? contact.image
                                        : 'http://placehold.it/80x80'
                                }
                                isOnline={contact.isOnline}
                                alt={contact.name}
                            />

                            <div>
                                <StyledRow>
                                    <ChatUser>{contact.name}</ChatUser>
                                    <ChatUserTime>
                                        {t('Chat.contactTime')}
                                    </ChatUserTime>
                                </StyledRow>
                                <ChatProject>{contact.project}</ChatProject>
                            </div>
                        </ChatListItem>
                    );
                })}
            </ChatLists>
            <> {isError && message.error('Not send a offer')}</>
        </Wrapper>
    );
};

export default ChatList;
