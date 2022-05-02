import { useAppSelector } from "hooks/redux";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormLink, Title, Wrapper } from "../styles";

const NotFoundEmail: React.FC = () => {
  const { isHasPassword } = useAppSelector((s) => s.userReducer);
  const { t } = useTranslation();

  return (
    <Wrapper>
      {isHasPassword ? (
        <div>
          <Title>{t("VerifyEmail.fineTitle")}</Title>
          <FormLink>
            <NavLink to="/">{t("VerifyEmail.linkToLogin")}</NavLink>
          </FormLink>
        </div>
      ) : (
        <div>
          <Title>{t("VerifyEmail.poorTitle")}</Title>
          <FormLink>
            <NavLink to="/forgotten_password">
              {t("VerifyEmail.linkToPasswordPage")}
            </NavLink>
          </FormLink>
        </div>
      )}
    </Wrapper>
  );
};

export default NotFoundEmail;
