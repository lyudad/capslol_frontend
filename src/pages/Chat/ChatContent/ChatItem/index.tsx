import React from 'react';

import { useAppSelector } from 'hooks/redux';
import Avatar from 'pages/Chat/ChatList/Avatar';
import { IChatItemProps } from 'pages/Chat/interfaces';
import {
    ChatItemCard,
    ChatItemContent,
    ChatMeta,
    ChatMsg,
    ChatTime,
} from './styles';

const ChatItem: React.FC<IChatItemProps> = ({ animationDelay, msg }) => {
    const { user } = useAppSelector((s) => s.auth);

    const sentTime = (date: string): string => {
        const today = new Date(date);
        const minutes =
            today.getMinutes() < 10
                ? `0${today.getMinutes()}`
                : today.getMinutes();
        const time = `${today.getHours()}:${minutes}`;

        return time;
    };

    return (
        <ChatItemCard
            style={{ animationDelay: `0.${animationDelay}s` }}
            className={`${msg?.senderId?.id === user?.id ? '' : 'other'}`}
        >
            <ChatItemContent className="chat__item__content">
                <ChatMsg>{msg?.content}</ChatMsg>
                <ChatMeta>
                    <ChatTime>{sentTime(msg?.createdAt)}</ChatTime>
                </ChatMeta>
            </ChatItemContent>

            <Avatar id={msg?.senderId?.id} />
        </ChatItemCard>
    );
};

export default ChatItem;
