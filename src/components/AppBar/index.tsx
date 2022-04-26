import React from "react";
import { NavLink } from "react-router-dom";
import { Header, NavigationContainer } from "./styles";

const AppBar: React.FC = () => {
  return (
    <Header>
      <NavigationContainer>
        <NavLink to="/" className="navLink">
          HOME
        </NavLink>
        <NavLink to="/profile" className="navLink">
          PROFILE
        </NavLink>
        <NavLink to="/test" className="navLink">
          TEST
        </NavLink>
      </NavigationContainer>
    </Header>
  );
};

export default AppBar;
