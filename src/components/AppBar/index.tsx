import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { notification } from 'antd';

import { useGetOffersQuery } from 'store/apis/chat';
import {
    Header,
    NavigationContainer,
    Logo,
    NotificationIcon,
    MessageIcon,
    NotificationFlex,
    Counter,
} from './styles';

const AppBar: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { data: offers } = useGetOffersQuery();

    const handleNotification = (): void => {
        offers?.map((offer) => {
            return notification.open({
                message: 'You have new notification',
                description: offer.messageType,
            });
        });
    };
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
                    <NavLink to="/test" className="navLink">
                        {t('AppBar.test')}
                    </NavLink>
                    <NavLink to="/jobs" className="navLink">
                        {t('AppBar.jobs')}
                    </NavLink>
                </div>

                <NotificationFlex>
                    {offers?.length && <Counter>{offers?.length}</Counter>}
                    <NotificationIcon onClick={handleNotification} />
                    <MessageIcon onClick={() => navigate('/chat')} />
                </NotificationFlex>
            </NavigationContainer>
        </Header>
    );
};

export default AppBar;
