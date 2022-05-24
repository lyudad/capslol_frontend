import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import SignInForm from 'components/SignInForm';
import {
    HomeContainer,
    Message,
    HomeTitle,
    Name,
    StyledNavLink,
} from './styles';

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const isAuth = useAppSelector((state) => state.auth.isLoggedIn);
    const firstName = useAppSelector((state) => state.auth.user?.firstName);

    return (
        <HomeContainer>
            {!isAuth ? (
                <SignInForm />
            ) : (
                <Message>
                    <HomeTitle>{t('HomePage.homeTitle')}</HomeTitle>
                    <p>
                        {t('HomePage.hello')} <Name>{firstName}</Name>
                        {t('HomePage.welcomeTo')}
                    </p>
                    <p>
                        {t('HomePage.youCanView')}{' '}
                        <b>
                            <StyledNavLink to="/profile">Profile</StyledNavLink>
                        </b>
                    </p>
                    <p>
                        {t('HomePage.orView')}{' '}
                        <b>
                            <StyledNavLink to="/jobs">job</StyledNavLink>
                        </b>{' '}
                        {t('HomePage.offers')}
                    </p>
                </Message>
            )}
        </HomeContainer>
    );
};

export default HomePage;
