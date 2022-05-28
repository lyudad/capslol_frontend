import React from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import { colors } from 'constants/index';
import { useAppSelector } from 'hooks/redux';
import Avatar from 'pages/Chat/ChatList/Avatar';
import { IChatItemProps, IOfferAccept } from 'pages/Chat/interfaces';
import {
    useDeleteContactByIdMutation,
    useDeleteMessageByIdMutation,
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
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    const [deleteContact] = useDeleteContactByIdMutation();
    const [deleteMessage] = useDeleteMessageByIdMutation();

    const handleAgree = async (): Promise<void> => {
        try {
            message.success('You accept offer');
        } catch (e) {
            message.error(e?.data?.message);
        }
    };

    const handleNotAgree = async (chat: IOfferAccept): Promise<void> => {
        try {
            await deleteContact(chat.chat);
            await deleteMessage(chat?.id);
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
                <ChatMsg>{msg.content}</ChatMsg>

                {msg.isOffer && (
                    <ButtonGroup>
                        <Button
                            bg={colors.textGreen}
                            color={colors.textWhite}
                            onClick={handleAgree}
                            mr="34"
                        >
                            {t('Chat.offerYes')}
                        </Button>
                        <Button
                            bg={colors.textWhiteRed}
                            color={colors.textWhite}
                            onClick={() => handleNotAgree(msg)}
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
