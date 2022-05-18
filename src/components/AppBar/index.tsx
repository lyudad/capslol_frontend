import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { message, notification } from "antd";

import {
  Header,
  NavigationContainer,
  Logo,
  NotificationIcon,
  MessageIcon,
  NotificationFlex,
  Counter,
} from "./styles";
import axios from "axios";

const AppBar: React.FC = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);

  const fetchOffers = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3002/offers`);
      setNotifications(data);
    } catch (e: unknown) {
      message.error(`Coudn\`t get offers ${e}`);
    }
  };

  const handleNotification = () => {
    notifications.map((notific: any) => {
      notification.open({
        message: "You have new notification",
        description: notific.messageType,
      });
    });
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <Header>
      <NavigationContainer>
        <Logo>
          <NavLink to="/" className="logoLink">
            <>
              {t("AppBar.get")}
              <span>{t("AppBar.job")}</span>
            </>
          </NavLink>
        </Logo>
        <div>
          <NavLink to="/" className="navLink">
            {t("AppBar.home")}
          </NavLink>
          <NavLink to="/profile" className="navLink">
            PROFILE
          </NavLink>
          <NavLink to="/test" className="navLink">
            {t("AppBar.test")}
          </NavLink>
        </div>

        <NotificationFlex>
          {notifications.length && <Counter>{notifications.length}</Counter>}
          <NotificationIcon onClick={handleNotification} />
          <MessageIcon />
        </NotificationFlex>
      </NavigationContainer>
    </Header>
  );
};

export default AppBar;
