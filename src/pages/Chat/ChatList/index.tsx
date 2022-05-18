import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";

import Avatar from "./Avatar";
import {
  ChatListItem,
  ChatLists,
  ChatProject,
  ChatUser,
  ChatUserTime,
  Input,
  SearchWrap,
  Wrapper,
  StyledRow,
} from "./styles";

const ChatList: React.FC<any> = ({ onChangeChat, contacts }) => {
  const [currentSelected, setCurrentSelected] = useState<number>();
  const [offers, setOffers] = useState([]);

  const changeChat = (id: any, chat: any) => {
    setCurrentSelected(id);
    onChangeChat(chat);
  };

  const handleNotification = async () => {
    // offers.push({
    //   senderName: "Ali",
    //   offer: "We are interested!",
    //   messageType: "Offer",
    //   to: 1,
    // });
    // const findOffer = offers.find((i) => i.to === 1);
    // Messages.map((i) =>
    //   i.from === findOffer.to ? { ...i, message: findOffer } : i
    // );
    const newOffer = {
      sender: {
        name: "Ali",
        id: Date.now(),
      },
      to: {
        name: "Jon",
        id: 1,
      },
      message: "We are interested you",
      messageType: "Offer",
    };
    try {
      const response = await axios.post(
        `http://localhost:3002/offers`,
        newOffer
      );

      setOffers(response.data);
    } catch (e: unknown) {
      message.error(`Offer doesn\`t send ${e}`);
    }
  };

  return (
    <Wrapper>
      <SearchWrap>
        <Input type="text" placeholder="Search" />
      </SearchWrap>
      <div>
        <button onClick={handleNotification}>Job Offer</button>
      </div>
      <ChatLists>
        {contacts.map((contact: any, index: number) => {
          return (
            <ChatListItem
              key={contact.id}
              style={{ animationDelay: `0.${index + 1}s` }}
              className={`${contact.id === currentSelected ? "active" : ""} `}
              onClick={() => changeChat(contact.id, contact)}
            >
              <Avatar
                image={
                  contact.image ? contact.image : "http://placehold.it/80x80"
                }
                isOnline={contact.isOnline}
                alt={contact.name}
              />

              <div>
                <StyledRow>
                  <ChatUser>{contact.name}</ChatUser>
                  <ChatUserTime>32 mins ago</ChatUserTime>
                </StyledRow>
                <ChatProject>{contact.project}</ChatProject>
              </div>
            </ChatListItem>
          );
        })}
      </ChatLists>
    </Wrapper>
  );
};

export default ChatList;
