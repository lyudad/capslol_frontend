import {
  HomeContainer,
  Message,
  HomeTitle,
  Name,
  StyledNavLink,
} from "./styles";
import SignUpForm from "components/SignInForm";
import { useAppSelector } from "hooks/redux";
const HomePage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.userReducer.isLoggedIn);
  const firstName = useAppSelector(
    (state) => state.userReducer.user?.firstName
  );

  return (
    <HomeContainer>
      {!isAuth ? (
        <SignUpForm />
      ) : (
        <Message>
          <HomeTitle>THE BEST WAY TO FIND YOUR JOB!</HomeTitle>
          <p>
            Hello <Name>{firstName}</Name>, welcome to our service.
          </p>
          <p>
            You can view yours{" "}
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
