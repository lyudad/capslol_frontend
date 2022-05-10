import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import AppBar from "components/AppBar";
import { StyledContent } from "components/UI";
import * as React from "react";

interface IMainLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
}

const MainLayout: React.FunctionComponent<IMainLayoutProps> = ({
  children,
}) => {
  return (
    <Layout>
      <Header>
        <AppBar />
      </Header>
      <Content>
        <StyledContent>{children}</StyledContent>
      </Content>
    </Layout>
  );
};

export default MainLayout;
