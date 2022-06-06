import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    Header,
    NavigationContainer,
    Logo,
    MessageIcon,
    NotificationFlex,
} from './styles';

const AppBar: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Header>
            <NavigationContainer>
                <Logo>
                    <NavLink to="/" className="logoLink">
                        <>
                            {t('AppBar.get')}
                            <span>{t('AppBar.job')}</span>
                        </>
                    </NavLink>
                </Logo>
                <div>
                    <NavLink to="/" className="navLink">
                        {t('AppBar.home')}
                    </NavLink>
                    <NavLink to="/profile" className="navLink">
                        PROFILE
                    </NavLink>

                    <NavLink to="/jobs" className="navLink">
                        {t('AppBar.jobs')}
                    </NavLink>
                    <NavLink to="/offers" className="navLink">
                        {t('AppBar.myOffers')}
                    </NavLink>
                    <NavLink to="/test" className="navLink">
                        {t('AppBar.test')}
                    </NavLink>
                </div>

                <NotificationFlex>
                    <MessageIcon onClick={() => navigate('/chat')} />
                </NotificationFlex>
            </NavigationContainer>
        </Header>
    );
};

export default AppBar;
