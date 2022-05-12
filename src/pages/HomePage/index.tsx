import {
  HomeContainer,
  Message,
  HomeTitle,
  Name,
  StyledNavLink,
} from "./styles";
import SignUpForm from "components/SignInForm";
import { useAppSelector } from "hooks/redux";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const isAuth = useAppSelector((state) => state.authReducer.isLoggedIn);
  const firstName = useAppSelector(
    (state) => state.authReducer.user?.firstName
  );

  return (
    <HomeContainer>
      {!isAuth ? (
        <SignUpForm />
      ) : (
        <Message>
          <HomeTitle>{t("HomePage.homeTitle")}</HomeTitle>
          <p>
            {t("HomePage.hello")} <Name>{firstName}</Name>
            {t("HomePage.welcomeTo")}
          </p>
          <p>
            {t("HomePage.youCanView")}{" "}
            <b>
              <StyledNavLink to="/profile">Profile</StyledNavLink>
            </b>
          </p>
        </Message>
      )}
    </HomeContainer>
  );
};

export default HomePage;
