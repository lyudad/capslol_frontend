import { useAppSelector } from "hooks/redux";
import React from "react";
import { NavLink } from "react-router-dom";
import { FormLink, Title, Wrapper } from "../styles";

const NotFoundEmail: React.FC = () => {
  const { isHasPassword } = useAppSelector((s) => s);

  return (
    <Wrapper>
      {isHasPassword ? (
        <div>
          <Title>
            "A recovery letter is sent, please check your email or go to Login
            page."
          </Title>
          <FormLink>
            <NavLink to="/">Login?</NavLink>
          </FormLink>
        </div>
      ) : (
        <div>
          <Title>
            "E-Mail Not Found: We were not able to
            locate merry.mazbell@gmail.com in our system. Please try another
            e-mail address."
          </Title>
          <FormLink>
            <NavLink to="/forgotten_password">Forgot Password?</NavLink>
          </FormLink>
        </div>
      )}
    </Wrapper>
  );
};

export default NotFoundEmail;
