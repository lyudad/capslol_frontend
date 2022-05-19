import React from 'react';
import axios from 'axios';
import { message } from 'antd';

import Button from 'common/Button/Button';
import { colors } from 'constants/index';
import { useAppSelector } from 'hooks/redux';
import Avatar from 'pages/Chat/ChatList/Avatar';
import { IChatItemProps } from 'pages/Chat/interfaces';
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

    const handleAgree = async (id: number): Promise<void> => {
        try {
            const { data } = await axios.get(
                `http://localhost:3002/offers/${id}`
            );
            const newMessage = {
                sender: {
                    pic: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
                    id: data.sender.id,
                    name: data.sender.name,
                },
                content: data.message,
                chat: data.sender.id,
            };
            await axios.post(`http://localhost:3002/messages`, newMessage);

            const newContact = {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
                id: data.sender.id,
                name: data.sender.name,
                project: data.sender.project,
                active: false,
                isOnline: false,
            };

            await axios.post(`http://localhost:3002/contacts`, newContact);

            await axios.delete(`http://localhost:3002/offers/${id}`);
        } catch (e) {
            message.error('Not Found');
        }
    };

    const handleNotAgree = async (id: number): Promise<void> => {
        try {
            await axios.delete(`http://localhost:3002/offers${id}`);
        } catch (e) {
            message.error('Not Found, not deleted');
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
                            Agree
                        </Button>
                        <Button
                            bg={colors.textWhiteRed}
                            color={colors.textWhite}
                            onClick={() => handleNotAgree(msg.id)}
                        >
                            No
                        </Button>
                    </ButtonGroup>
                )}

                <ChatMeta>
                    <ChatTime>1.03 PM</ChatTime>
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
