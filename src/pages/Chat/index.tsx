import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import ChatContent from "./ChatContent";
import ChatList from "./ChatList";
import { Wrapper } from "./styles";
import Welcome from "./Welcome";

const Chat: React.FC = () => {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [notifications, setNotifications] = useState([]);

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

  const fetchContacts = async () => {
    try {
      // if (notifications) {
      //   const { data } = await axios.post(
      //     `http://localhost:3002/contacts`,
      //     notifications
      //   );
      //   setContacts(data);
      // } else {
      const { data } = await axios.get(`http://localhost:3002/contacts`);
      setContacts(data);
      // }
    } catch (e: any) {
      message.error(e.data.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChat = (chat: any): void => {
    setCurrentChat(chat);
  };

  return (
    <Wrapper>
      <ChatList onChangeChat={handleChat} contacts={contacts} />
      {currentChat === undefined ? (
        <Welcome />
      ) : (
        <ChatContent currentChat={currentChat} />
      )}
    </Wrapper>
  );
};

export default Chat;
