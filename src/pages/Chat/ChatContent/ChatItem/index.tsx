import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import Button from 'common/Button/Button';
import { colors, Img } from 'constants/index';
import { useAppSelector } from 'hooks/redux';
import Avatar from 'pages/Chat/ChatList/Avatar';
import { IChatItemProps } from 'pages/Chat/interfaces';
import {
    usePostMessageMutation,
    useDeleteOfferByIdMutation,
    usePostContactsMutation,
} from 'store/apis/chat';
import {
    ButtonGroup,
    ChatItemCard,
    ChatItemContent,
    ChatMeta,
    ChatMsg,
    ChatTime,
} from './styles';

const ChatItem: React.FC<IChatItemProps> = ({ animationDelay, msg }) => {
    const { user } = useAppSelector((s) => s.authReducer);
    const { t } = useTranslation();

    const [postMessage] = usePostMessageMutation();
    const [deleteOffer] = useDeleteOfferByIdMutation();
    const [postContact] = usePostContactsMutation();

    const handleAgree = async (id: number): Promise<void> => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_OFFER}/${id}`
            );
            const newMessage = {
                sender: {
                    pic: Img.userLogo,
                    id: data.sender.id,
                    name: data.sender.name,
                },
                content: data.message,
                chat: data.sender.id,
            };

            const newContact = {
                image: Img.userLogo,
                id: data.sender.id,
                name: data.sender.name,
                project: data.sender.project,
                active: false,
                isOnline: false,
            };

            await postMessage(newMessage);

            await postContact(newContact);

            await deleteOffer(id);
        } catch (e) {
            message.error(e?.data?.message);
        }
    };

    const handleNotAgree = async (id: number): Promise<void> => {
        try {
            await deleteOffer(id);
        } catch (e) {
            message.error(e?.data?.message);
        }
    };

    return (
        <ChatItemCard
            style={{ animationDelay: `0.${animationDelay}s` }}
            className={`${msg.sender.id === (user?.id || 1) ? '' : 'other'}`}
        >
            <ChatItemContent className="chat__item__content">
                <ChatMsg>{msg.content || msg.message}</ChatMsg>

                {msg.message && (
                    <ButtonGroup>
                        <Button
                            bg={colors.textGreen}
                            color={colors.textWhite}
                            onClick={() => handleAgree(msg.id)}
                            mr="34"
                        >
                            {t('Chat.offerYes')}
                        </Button>
                        <Button
                            bg={colors.textWhiteRed}
                            color={colors.textWhite}
                            onClick={() => handleNotAgree(msg.id)}
                        >
                            {t('Chat.offerNo')}
                        </Button>
                    </ButtonGroup>
                )}

                <ChatMeta>
                    <ChatTime>{t('Chat.sendTime')}</ChatTime>
                </ChatMeta>
            </ChatItemContent>

            <Avatar
                isOnline="active"
                image={msg.sender.pic}
                alt={msg.sender.name}
            />
        </ChatItemCard>
    );
};

export default ChatItem;
