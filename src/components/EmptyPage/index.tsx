import React from "react";
import { Button, Title, WelcomePageContainer, Wrapper } from "./style";

const EmptyPage: React.FC = () => {
  return (
    <WelcomePageContainer>
      <Wrapper>
        <Title>
          Here is empty. Please, firstly, complete your Public Profile!
        </Title>
        <Button> Complete Public Profile</Button>
      </Wrapper>
    </WelcomePageContainer>
  );
};

export default EmptyPage;
