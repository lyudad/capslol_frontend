import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';

import { logOut } from 'store/slices/auth/auth.slice';
import { useGetUserProfileQuery } from 'store/apis/jobs';
import { Paths } from 'router/paths';
import { userRole } from 'constants/index';
import { useDispatch } from 'react-redux';
import avatar from 'assets/avatar.png';
import { HideWrapper } from 'components/HideWrapper/styles';
import {
    Header,
    NavigationContainer,
    Logo,
    MessageIcon,
    NotificationFlex,
    BarAvatarImg,
    LoggedName,
    LogoutButton,
} from './styles';

const AppBar: React.FC = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isAuth = useAppSelector((state) => state.auth.isLoggedIn);

    const role = useAppSelector((state) => state.auth.user?.role);

    const user = useAppSelector((state) => state.auth.user);

    const { data: userProfile } = useGetUserProfileQuery(user?.id);

    const logout = (): void => {
        dispatch(logOut());
        navigate(Paths.HOME);
    };

    return (
        <Header>
            <NavigationContainer>
                <Logo>
                    <NavLink to={Paths.HOME} className="logoLink">
                        <>
                            {t('AppBar.get')}
                            <span>{t('AppBar.job')}</span>
                        </>
                    </NavLink>
                </Logo>
                <span>
                    <NavLink to={Paths.HOME} className="navLink">
                        {t('AppBar.home')}
                    </NavLink>
                </span>
                <HideWrapper showWhen={isAuth}>
                    <NavLink to={Paths.JOBS} className="navLink">
                        {t('AppBar.jobs')}
                    </NavLink>
                    <HideWrapper showWhen={role === userRole.owner}>
                        <NavLink to="/talents" className="navLink">
                            {t('AppBar.Talents')}
                        </NavLink>
                        <NavLink to={Paths.OWNER_JOBS} className="navLink">
                            {t('AppBar.ownerJobs')}
                        </NavLink>
                    </HideWrapper>
                    <HideWrapper showWhen={role === userRole.freelancer}>
                        <NavLink to={Paths.OFFERS} className="navLink">
                            {t('AppBar.myOffers')}
                        </NavLink>
                        <NavLink to={Paths.MY_CONTRACTS} className="navLink">
                            {t('AppBar.myContracts')}
                        </NavLink>
                        <NavLink
                            to={`/profile/${user?.id}`}
                            className="navLink"
                        >
                            {t('AppBar.profile')}
                        </NavLink>
                    </HideWrapper>
                    <NavLink to={Paths.TEST} className="navLink">
                        {t('AppBar.test')}
                    </NavLink>
                </HideWrapper>
            </NavigationContainer>
            <HideWrapper showWhen={isAuth}>
                <NotificationFlex>
                    <LoggedName>
                        {t('AppBar.welcome')}
                        <span>
                            {user?.firstName} {user?.lastName}
                        </span>
                    </LoggedName>
                    <BarAvatarImg>
                        <img src={userProfile?.profileImage || avatar} alt="" />
                    </BarAvatarImg>
                    <MessageIcon onClick={() => navigate(Paths.CHAT)} />

                    <LogoutButton type="primary" size="small" onClick={logout}>
                        {t('AppBar.logout')}
                    </LogoutButton>
                </NotificationFlex>
            </HideWrapper>
        </Header>
    );
};

export default AppBar;
