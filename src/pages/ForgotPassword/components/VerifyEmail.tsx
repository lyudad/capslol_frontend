import { useAppSelector } from "hooks/redux";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormLink, Title, Wrapper } from "../styles";

const NotFoundEmail: React.FC = () => {
  const { isHasPassword } = useAppSelector((s) => s);
  const { t } = useTranslation();

  return (
    <Wrapper>
      {isHasPassword ? (
        <div>
          <Title>{t("pwEn:VerifyEmail.fineTitle")}</Title>
          <FormLink>
            <NavLink to="/">{t("pwEn:VerifyEmail.linkToLogin")}</NavLink>
          </FormLink>
        </div>
      ) : (
        <div>
          <Title>{t("pwEn:VerifyEmail.poorTitle")}</Title>
          <FormLink>
            <NavLink to="/forgotten_password">
              {t("pwEn:VerifyEmail.linkToPasswordPage")}
            </NavLink>
          </FormLink>
        </div>
      )}
    </Wrapper>
  );
};

export default NotFoundEmail;
