import { message } from "antd";
import axios from "axios";
import { useAppSelector } from "hooks/redux";
import React, { useEffect, useState } from "react";
import Avatar from "../ChatList/Avatar";
// import { chatItms, Messages, offers } from "../data";
import { IChatContent } from "../interfaces";
import ChatItem from "./ChatItem";
import {
  ChatBody,
  ChatFooter,
  ChatHeader,
  CurrentChatUser,
  MainChat,
  Project,
  ProjectOwner,
  SendNewMessage,
  SendNewMessageBtn,
  SendNewMessageIcon,
  SendNewMessageIconPlus,
  SendNewMessageInput,
  SettingsBtn,
  Wrapper,
} from "./styles";

const ChatContent: React.FC<IChatContent> = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState<string>("");
  const { user } = useAppSelector((s) => s.authReducer);
  const [notifications, setNotifications] = useState([]);

  const handleMessage = async (): Promise<void> => {
    try {
      const newMessage = {
        sender: {
          pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
          _id: user?.id || 1,
          name: `${user?.firstName} ${user?.lastName}`,
        },
        content: messageText,
        chat: currentChat.id,
      };
      const response = await axios.post(
        `http://localhost:3002/messages`,
        newMessage
      );
      setMessageText("");
    } catch (e: any) {
      message.error(e.data.message);
    }
  };

  const fetchMessage = async (): Promise<void> => {
    try {
      const { data } = await axios.get("http://localhost:3002/messages");
      setMessages(data);
    } catch (e: any) {
      message.error(e.data.message);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [currentChat]);

  const fetchOffers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3002/offers`);
      setNotifications(data);
    } catch (e: unknown) {
      message.error(`Coudn\`t get offers ${e}`);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <Wrapper>
      <MainChat>
        <ChatHeader>
          <div>
            <CurrentChatUser>
              <Avatar
                isOnline="active"
                image={currentChat.image}
                alt={currentChat.name}
              />
              <div>
                <ProjectOwner>{currentChat.name}</ProjectOwner>
                <Project>{currentChat.project}</Project>
              </div>
            </CurrentChatUser>
          </div>

          <div>
            <SettingsBtn>
              <span>...</span>
            </SettingsBtn>
          </div>
        </ChatHeader>
        <ChatBody>
          <div>
            {messages
              .filter((contact: any) => contact.chat === currentChat.id)
              .map((itm: any, index) => {
                return (
                  <ChatItem
                    animationDelay={index + 2}
                    key={itm.id}
                    item={itm}
                  />
                );
              })}
            {notifications &&
              notifications.map((itm: any, index) => (
                <ChatItem animationDelay={index + 2} key={itm.id} item={itm} />
              ))}
          </div>
        </ChatBody>
        <ChatFooter>
          <SendNewMessage>
            <SendNewMessageBtn>
              <SendNewMessageIconPlus />
            </SendNewMessageBtn>
            <SendNewMessageInput
              value={messageText}
              type="text"
              placeholder="Write a message..."
              onChange={(e) => setMessageText(e.target.value)}
            />
            <SendNewMessageBtn onClick={handleMessage}>
              <SendNewMessageIcon />
            </SendNewMessageBtn>
          </SendNewMessage>
        </ChatFooter>
      </MainChat>
    </Wrapper>
  );
};

export default ChatContent;
