import React from "react";
import { Wrapper, Title } from "./styles";
import TestReusable from "components/testReusable";

const TestPage: React.FC = () => {
  return (
    <Wrapper>
      <Title>Test Page</Title>
      <TestReusable />
    </Wrapper>
  );
};

export default TestPage;
