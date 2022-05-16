import Avatar from "pages/Chat/ChatList/Avatar";
import { IChatItemProps } from "pages/Chat/interfaces";
import React from "react";
import {
  ChatItemCard,
  ChatItemContent,
  ChatMeta,
  ChatMsg,
  ChatTime,
} from "./styles";

const ChatItem: React.FC<IChatItemProps> = ({
  user,
  msg,
  image,
  animationDelay,
}) => {
  return (
    <>
      <ChatItemCard
        style={{ animationDelay: `0.${animationDelay}s` }}
        className={`${user ? user : ""}`}
      >
        <ChatItemContent className="chat__item__content">
          <ChatMsg>{msg}</ChatMsg>
          <ChatMeta>
            <ChatTime>1.03 PM</ChatTime>
          </ChatMeta>
        </ChatItemContent>
        <Avatar isOnline="active" image={image} alt={"me"} />
      </ChatItemCard>
    </>
  );
};

export default ChatItem;
