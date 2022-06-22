import React, { useContext } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import { AppContext } from 'context';
import { useAppSelector } from 'hooks/redux';
import { IChatFormProps } from 'pages/Chat/interfaces';
import {
    SendNewMessage,
    EmojiIcon,
    SendNewMessageInput,
    SendNewMessageBtn,
    SendNewMessageIcon,
} from '../styles';

const ChatForm: React.FC<IChatFormProps> = ({
    handleShowEmojis,
    currentChat,
    inputRef,
    setMessageText,
    messageText,
}) => {
    const { socket } = useContext(AppContext);
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    const handleMessage = async (): Promise<void> => {
        try {
            const newMessage = {
                content: `<div>${messageText}</div>`,
                senderId: user?.id,
                roomId: currentChat.id,
            };
            socket.emit('msgToServer', newMessage, () => {
                setMessageText('');
            });
        } catch (error) {
            message.error(error?.message);
        }
    };

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const newValue = event.currentTarget.value;
        setMessageText(newValue);
    };
    const handleOnKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (event.key === 'Enter') {
            handleMessage();
        }
    };

    return (
        <SendNewMessage>
            <EmojiIcon onClick={handleShowEmojis} />

            <SendNewMessageInput
                ref={inputRef}
                value={messageText}
                type="text"
                placeholder={`${t('Chat.sendMsgPlaceholder')}`}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
            />
            <SendNewMessageBtn onClick={handleMessage}>
                <SendNewMessageIcon />
            </SendNewMessageBtn>
        </SendNewMessage>
    );
};

export default ChatForm;
