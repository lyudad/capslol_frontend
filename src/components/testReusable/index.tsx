import React from "react";
import { useTranslation } from "react-i18next";
import { Wrapper, Title } from "./styles";

const TestReusable: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Title>{t("TestReusable.wonderfulWorld")}</Title>
    </Wrapper>
  );
};

export default TestReusable;
