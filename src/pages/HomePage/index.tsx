import { useAppSelector } from 'hooks/redux';
import SignInForm from 'components/SignInForm/index';
import { HideWrapper } from 'components/HideWrapper/styles';
import { HomeContainer } from './styles';

const HomePage: React.FC = () => {
    const isAuth = useAppSelector((state) => state.auth.isLoggedIn);

    return (
        <HomeContainer>
            <HideWrapper showWhen={!isAuth}>
                <SignInForm />
            </HideWrapper>
        </HomeContainer>
    );
};

export default HomePage;
