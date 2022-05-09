import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormLink, Section, Title, Wrapper } from "../styles";
import { IProps } from "./props";

<<<<<<< HEAD
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
=======
const NotFoundEmail: React.FC<IProps> = ({ data, isError }) => {
  const { t } = useTranslation();

  return (
    <Section>
      <Wrapper width="450">
        {data && (
          <>
            <Title>{t("VerifyEmail.fineTitle")}</Title>
            <FormLink>
              <NavLink to="/">{t("VerifyEmail.linkToLogin")}</NavLink>
            </FormLink>
          </>
        )}
        {isError && <Title>{t("VerifyEmail.poorTitle")}</Title>}
      </Wrapper>
    </Section>
>>>>>>> develop
  );
};

export default NotFoundEmail;
