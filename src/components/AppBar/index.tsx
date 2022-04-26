import React from "react";
import { NavLink } from "react-router-dom";
import { Header, NavigationContainer, Logo } from "./styles";

const AppBar: React.FC = () => {
  return (
    <Header>
      <NavigationContainer>
        <Logo>
          <NavLink to="/" className="logoLink">
            Get<span>JOB!</span>
          </NavLink>
        </Logo>
        <NavLink to="/" className="navLink">
          HOME
        </NavLink>
        <NavLink to="/test" className="navLink">
          TEST
        </NavLink>
      </NavigationContainer>
    </Header>
  );
};

export default AppBar;
