import SignInForm from 'components/SignInForm/index';
import { HomeContainer } from './styles';

const HomePage: React.FC = () => {
    return (
        <HomeContainer>
            <SignInForm />
        </HomeContainer>
    );
};

export default HomePage;
