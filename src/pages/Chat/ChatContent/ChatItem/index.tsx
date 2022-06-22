/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import parse from 'html-react-parser';

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
    const scrollRef = useRef<any>();

    const sentTime = (date: string): string => {
        const today = new Date(date);
        const minutes =
            today.getMinutes() < 10
                ? `0${today.getMinutes()}`
                : today.getMinutes();
        const time = `${today.getHours()}:${minutes}`;

        return time;
    };

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msg]);

    return (
        <ChatItemCard
            ref={scrollRef}
            style={{
                animationDelay: `0.${animationDelay}s`,
                display: `${msg?.isOffer ? 'flex' : ''}`,
                justifyContent: `${msg?.isOffer ? 'center' : ''}`,
            }}
            className={`${msg?.senderId?.id === user?.id ? '' : 'other'}`}
        >
            <ChatItemContent
                className="chat__item__content"
                style={{
                    marginRight: `${msg?.isOffer && '0'}`,
                    borderRadius: `${msg?.isOffer && '10px'}`,
                }}
            >
                <ChatMsg>{parse(msg?.content)}</ChatMsg>
                <ChatMeta>
                    <ChatTime>{sentTime(msg?.createdAt)}</ChatTime>
                </ChatMeta>
            </ChatItemContent>

            {!msg.isOffer && <Avatar id={msg?.senderId?.id} />}
        </ChatItemCard>
    );
};

export default ChatItem;
