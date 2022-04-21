import { HomeContainer, HomeTitle, TitleContainer, Slogan } from "./styles";

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <TitleContainer>
        <HomeTitle>THE BEST WAY TO FIND YOUR JOB!</HomeTitle>
        <Slogan>ТУТ МОЖЕТ БЫТЬ СЛОГАН</Slogan>
      </TitleContainer>
    </HomeContainer>
  );
};

export default HomePage;
