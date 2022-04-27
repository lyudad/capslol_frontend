import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header, NavigationContainer, Logo } from "./styles";

const AppBar: React.FC = () => {
  const { t } = useTranslation();
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
        <NavLink to="/" className="navLink">
          {t("AppBar.home")}
        </NavLink>
        <NavLink to="/profile" className="navLink">
          PROFILE
        </NavLink>
        <NavLink to="/test" className="navLink">
          {t("AppBar.test")}
        </NavLink>
      </NavigationContainer>
    </Header>
  );
};

export default AppBar;
