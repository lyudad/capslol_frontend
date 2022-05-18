import { message } from "antd";
import axios from "axios";
import { useAppSelector } from "hooks/redux";
import Avatar from "pages/Chat/ChatList/Avatar";
import { IChatItemProps } from "pages/Chat/interfaces";
import React, { useEffect, useState } from "react";
import {
  ChatItemCard,
  ChatItemContent,
  ChatMeta,
  ChatMsg,
  ChatTime,
} from "./styles";

const ChatItem: React.FC<IChatItemProps> = ({ animationDelay, item }) => {
  const { user } = useAppSelector((s) => s.authReducer);

  return (
    <ChatItemCard
      style={{ animationDelay: `0.${animationDelay}s` }}
      className={`${item.sender._id === (user?.id || 1) ? "" : "other"}`}
    >
      <ChatItemContent className="chat__item__content">
        <ChatMsg>{item.content || item.message}</ChatMsg>
        <ChatMeta>
          <ChatTime>1.03 PM</ChatTime>
        </ChatMeta>
      </ChatItemContent>
      <Avatar
        isOnline="active"
        image={item.sender.pic}
        alt={item.sender.name}
      />
    </ChatItemCard>
  );
};

export default ChatItem;
