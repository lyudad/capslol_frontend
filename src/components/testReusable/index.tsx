import React from 'react';
import { useTranslation } from 'react-i18next';
import testImage from 'assets/test-img.jpg';
import { Wrapper, Title } from './styles';

const TestReusable: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Wrapper>
            <Title>{t('TestReusable.wonderfulWorld')}</Title>
            <img src={testImage} alt="" />
        </Wrapper>
    );
};

export default TestReusable;
