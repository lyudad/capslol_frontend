import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

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
import { IChatListProps, IChatOffer, TChatArgument } from '../interfaces';

const ChatList: React.FC<IChatListProps> = ({ onChangeChat, contacts }) => {
    const [currentSelected, setCurrentSelected] = useState<number>();
    const [_, setOffers] = useState<IChatOffer[]>([]);

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
            const { data } = await axios.post(
                `http://localhost:3002/offers`,
                newOffer
            );

            setOffers(data);
        } catch (e) {
            message.error(`Offer doesn\`t send ${e}`);
        }
    };

    return (
        <Wrapper>
            <SearchWrap>
                <Input type="text" placeholder="Search" />
            </SearchWrap>
            <div>
                <button type="button" onClick={handleNotification}>
                    Job Offer
                </button>
            </div>
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
                                    <ChatUserTime>32 mins ago</ChatUserTime>
                                </StyledRow>
                                <ChatProject>{contact.project}</ChatProject>
                            </div>
                        </ChatListItem>
                    );
                })}
            </ChatLists>
        </Wrapper>
    );
};

export default ChatList;
