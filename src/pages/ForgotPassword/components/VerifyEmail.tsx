import { useAppSelector } from "hooks/redux";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormLink, Title, Wrapper } from "../styles";

const NotFoundEmail: React.FC = () => {
  const { isHasPassword } = useAppSelector((state) => state.userReducer);
  const { t: translator } = useTranslation();

  return (
    <Wrapper>
      {isHasPassword ? (
        <div>
          <Title>{translator("VerifyEmail.fineTitle")}</Title>
          <FormLink>
            <NavLink to="/">{translator("VerifyEmail.linkToLogin")}</NavLink>
          </FormLink>
        </div>
      ) : (
        <div>
          <Title>{translator("VerifyEmail.poorTitle")}</Title>
          <FormLink>
            <NavLink to="/forgotten_password">
              {translator("VerifyEmail.linkToPasswordPage")}
            </NavLink>
          </FormLink>
        </div>
      )}
    </Wrapper>
  );
};

export default NotFoundEmail;
