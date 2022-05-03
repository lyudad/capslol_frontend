import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormLink, Title, Wrapper } from "../styles";
import { useAppSelector } from "hooks/redux";
import { useConfirmEmailMutation } from "redux/services/passwordApi";

const NotFoundEmail: React.FC = () => {
  const { t } = useTranslation();
  const [_, { data }] = useConfirmEmailMutation();

  return (
    <Wrapper>
      {data ? (
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
