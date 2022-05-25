import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/redux';
import { WelcomeTitle, Wrapper } from './styles';

const Welcome: React.FC = () => {
    const { user } = useAppSelector((s) => s.auth);
    const { t } = useTranslation();

    return (
        <Wrapper>
            <WelcomeTitle>
                {t('Chat.welcome')},{' '}
                <span>{user?.firstName ? user?.firstName : 'User'}!</span>
            </WelcomeTitle>
            <WelcomeTitle>{t('Chat.welcomeText')}</WelcomeTitle>
        </Wrapper>
    );
};

export default Welcome;
