import React, { useEffect, useState } from "react";

import { useAppSelector } from "hooks/redux";
import { WelcomeTitle, Wrapper } from "./styles";
import { message } from "antd";
import axios from "axios";
import ChatItem from "../ChatContent/ChatItem";

const Welcome: React.FC = () => {
  const { user } = useAppSelector((s) => s.authReducer);

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

  return (
    <Wrapper>
      {notifications ? (
        <>
          {notifications &&
            notifications.map((itm: any, index) => (
              <ChatItem animationDelay={index + 2} key={itm.id} item={itm} />
            ))}
        </>
      ) : (
        <>
          <WelcomeTitle>
            Welcome, <span>{user?.firstName ? user?.firstName : ""}!</span>
          </WelcomeTitle>
          <WelcomeTitle>Please select a chat to Start messaging.</WelcomeTitle>
        </>
      )}
    </Wrapper>
  );
};

export default Welcome;
