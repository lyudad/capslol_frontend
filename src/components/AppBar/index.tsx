import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message, notification } from 'antd';

import { IChatOffer } from 'pages/Chat/interfaces';
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
    const [offers, setOffers] = useState<IChatOffer[]>([]);

    const fetchOffers = async (): Promise<void> => {
        try {
            const { data } = await axios.get(`http://localhost:3002/offers`);
            setOffers(data);
        } catch (e) {
            message.error(`Not Found, coudn\`t get offers`);
        }
    };

    const handleNotification = (): void => {
        offers.map((offer) => {
            return notification.open({
                message: 'You have new notification',
                description: offer.messageType,
            });
        });
    };

    useEffect(() => {
        fetchOffers();
    }, []);

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
                </div>

                <NotificationFlex>
                    {offers.length && <Counter>{offers.length}</Counter>}
                    <NotificationIcon onClick={handleNotification} />
                    <MessageIcon onClick={() => navigate('/chat')} />
                </NotificationFlex>
            </NavigationContainer>
        </Header>
    );
};

export default AppBar;
