import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import AppBar from 'components/AppBar';
import { StyledContent } from 'components/UI';
import * as React from 'react';
import { StyledHeader } from './styles';

interface IMainLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

const MainLayout: React.FunctionComponent<IMainLayoutProps> = ({
    children,
}) => {
    return (
        <Layout>
            <StyledHeader>
                <AppBar />
            </StyledHeader>
            <Content>
                <StyledContent>{children}</StyledContent>
            </Content>
        </Layout>
    );
};

export default MainLayout;
