import React from "react";
import { useTranslation } from "react-i18next";
import TestReusable from "components/testReusable";
import { Wrapper, Title } from "./styles";

const TestPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Title>{t("TestPage.testPage")}</Title>
      <TestReusable />
    </Wrapper>
  );
};

export default TestPage;
