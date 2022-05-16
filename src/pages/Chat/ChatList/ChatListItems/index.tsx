import React from "react";
import Avatar from "../Avatar";
import { ChatListItem, ChatUser, ChatUserTime } from "./styles";
import { IChatListProps } from "pages/Chat/interfaces";

const ChatListItems: React.FC<IChatListProps> = ({
  active,
  image,
  name,
  animationDelay,
  isOnline,
}) => {
  return (
    <>
      <ChatListItem
        style={{ animationDelay: `0.${animationDelay}s` }}
        className={`${active ? active : ""} `}
      >
        <Avatar
          image={image ? image : "http://placehold.it/80x80"}
          isOnline={isOnline}
          alt={name}
        />

        <div>
          <ChatUser>{name}</ChatUser>
          <ChatUserTime>32 mins ago</ChatUserTime>
        </div>
      </ChatListItem>
    </>
  );
};

export default ChatListItems;
