import React, { useState } from 'react';
import { message, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import {
    usePostMessageMutation,
    usePostContactsMutation,
} from 'store/apis/chat';
import { Img } from 'constants/index';
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
    NotFoundTitle,
} from './styles';
import { IChatListProps, TChatArgument } from '../interfaces';

const ChatList: React.FC<IChatListProps> = ({ onChangeChat, contacts }) => {
    const [currentSelected, setCurrentSelected] = useState<number>();
    const { t } = useTranslation();
    const [search, setSearch] = useState<string>('');

    const [postMessage] = usePostMessageMutation();
    const [postContact] = usePostContactsMutation();

    const changeChat = (id: number, chat: TChatArgument): void => {
        setCurrentSelected(id);
        onChangeChat(chat);
    };

    const handleNotification = async (): Promise<void> => {
        try {
            const newMessage = {
                sender: {
                    pic: Img.userLogo,
                    id: Date.now(),
                    name: 'Jonanhton',
                },
                content: 'We are interested you',
                chat: Date.now(),
                isOffer: true,
            };

            const newContact = {
                image: Img.userLogo,
                id: Date.now(),
                name: 'Jonanhton',
                project: 'Create UI Chat',
                active: false,
                isOnline: false,
            };

            await postMessage(newMessage);

            await postContact(newContact);
        } catch (e) {
            message.error(e?.data?.message);
        }
    };

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const newValue = e.currentTarget.value;
        setSearch(newValue);
    };

    return (
        <Wrapper>
            <SearchWrap>
                <Input
                    type="text"
                    onChange={(e) => onChange(e)}
                    placeholder="Search"
                />
            </SearchWrap>
            <Row justify="center">
                <button type="button" onClick={handleNotification}>
                    {t('Chat.offerBtnText')}
                </button>
            </Row>
            <ChatLists>
                {contacts
                    .filter(
                        (contact) =>
                            contact.name
                                ?.toLowerCase()
                                .includes(search?.toLowerCase()) ||
                            search?.trim() === ''
                    )
                    .map((contact, index: number) => {
                        return (
                            <ChatListItem
                                key={contact.id}
                                style={{ animationDelay: `0.${index + 1}s` }}
                                className={`${
                                    contact.id === currentSelected
                                        ? 'active'
                                        : ''
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

                <>
                    {' '}
                    {!contacts?.filter(
                        (contact) =>
                            contact.name
                                ?.toLowerCase()
                                .includes(search?.toLowerCase()) ||
                            search?.trim() === ''
                    ).length && (
                        <NotFoundTitle>{t('Chat.notFound')}</NotFoundTitle>
                    )}
                </>
            </ChatLists>
        </Wrapper>
    );
};

export default ChatList;
