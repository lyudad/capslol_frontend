import { useCallback, useMemo } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';

import { logOut, setMessagesCount } from 'store/slices/auth/auth.slice';
import { Paths } from 'router/paths';
import { userRole } from 'constants/index';
import { useDispatch } from 'react-redux';
import LiveNotification from 'components/LiveNotification';
import avatar from 'assets/avatar.png';
import { HideWrapper } from 'components/HideWrapper/styles';
import { StyledImg } from 'pages/MyContacts(JobOwner)/styles';
import { NavWrapper } from 'components/LiveNotification/styles';
import AuthGoogle from 'components/AuthGoogle';
import { message } from 'antd';
import {
    Header,
    NavigationContainer,
    Logo,
    NotificationFlex,
    BarAvatarImg,
    LoggedName,
    LogoutButton,
    NavButton,
} from './styles';

const AppBar: React.FC = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isAuth = useAppSelector((state) => state.auth.isLoggedIn);

    const role = useAppSelector((state) => state.auth.user?.role);

    const user = useAppSelector((state) => state.auth.user);

    const userId = useAppSelector((state) => state.auth.user?.id);

    const userProfile = useAppSelector((state) => state.auth.profile);

    const jobsOwnLength = useAppSelector((state) => state.auth.ownerJobsLength);

    const messagesCount = useAppSelector(
        (state) => state.auth.counts.messagesCount
    );
    const isGoogle = useAppSelector((state) => state.auth.user?.isGoogle);

    const profilePath = useMemo(() => {
        if (userId) {
            return `profile/${userId}`;
        }
        return '';
    }, [userId]);

    const logout = (): void => {
        dispatch(logOut());
        navigate(Paths.HOME);
    };

    const successHandler = (): void => {
        try {
            dispatch(logOut());
            navigate(Paths.HOME);
        } catch (error) {
            message.error(error.status);
        }
    };

    const failureHandler = (): void => {
        try {
            dispatch(logOut());
            navigate(Paths.HOME);
        } catch (error) {
            message.error(error.status);
        }
    };
    return (
        <Header>
            <NavigationContainer>
                <Logo>
                    <NavLink to="/logo" className="logoLink">
                        <>
                            {t('AppBar.get')}
                            <span>{t('AppBar.job')}</span>
                        </>
                    </NavLink>
                </Logo>
                <HideWrapper showWhen={isAuth}>
                    <HideWrapper
                        showWhen={role === userRole.freelancer && !!userProfile}
                    >
                        <NavLink to={Paths.JOBS} className="navLink">
                            {t('AppBar.jobs')}
                        </NavLink>
                    </HideWrapper>
                    <HideWrapper
                        showWhen={role === userRole.freelancer && !!userProfile}
                    >
                        <NavLink to={Paths.OFFERS} className="navLink">
                            {t('AppBar.myOffers')}
                        </NavLink>
                    </HideWrapper>

                    <HideWrapper showWhen={role === userRole.owner}>
                        <NavLink to={Paths.OWNER_JOBS} className="navLink">
                            {t('AppBar.myProjects')}
                        </NavLink>
                    </HideWrapper>
                    <HideWrapper
                        showWhen={role === userRole.owner && !!jobsOwnLength}
                    >
                        <NavLink to={Paths.TALENT} className="navLink">
                            {t('AppBar.Talents')}
                        </NavLink>
                    </HideWrapper>
                    <HideWrapper
                        showWhen={
                            (role === userRole.owner && !!jobsOwnLength) ||
                            (role === userRole.freelancer && !!userProfile)
                        }
                    >
                        <NavLink to={Paths.MY_CONTRACTS} className="navLink">
                            {t('AppBar.myContracts')}
                        </NavLink>
                    </HideWrapper>
                    <HideWrapper
                        showWhen={role === userRole.owner && !!jobsOwnLength}
                    >
                        <NavLink to={Paths.MY_CONTACTS} className="navLink">
                            {t('AppBar.myContacts')}
                        </NavLink>
                    </HideWrapper>
                    <HideWrapper
                        showWhen={
                            (role === userRole.owner && !!jobsOwnLength) ||
                            (role === userRole.freelancer && !!userProfile)
                        }
                    >
                        <NavWrapper>
                            <NavLink to={Paths.CHAT} className="navLink">
                                <NavButton
                                    onClick={() =>
                                        dispatch(setMessagesCount(0))
                                    }
                                    type="button"
                                >
                                    {t('AppBar.chat')}{' '}
                                </NavButton>
                            </NavLink>

                            <LiveNotification count={messagesCount} />
                        </NavWrapper>
                        {/* <NavWrapper>
                            <NavButton
                                onClick={() => navigate(Paths.CHAT)}
                                className="navLink"
                            >
                                <a href={Paths.CHAT}>{t('AppBar.chat')}</a>
                            </NavButton>
                            <LiveNotification count={messagesCount} />
                        </NavWrapper> */}
                    </HideWrapper>

                    <HideWrapper showWhen={role === userRole.freelancer}>
                        <NavLink to={profilePath} className="navLink">
                            {t('AppBar.profile')}
                        </NavLink>
                    </HideWrapper>
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
                        <StyledImg
                            src={userProfile?.profileImage || avatar}
                            alt=""
                        />
                    </BarAvatarImg>
                    {isGoogle ? (
                        <AuthGoogle
                            isLogOut
                            buttonText="AuthGoogle.logOut"
                            onLogOutSuccess={successHandler}
                            onLogOutFailure={failureHandler}
                            onRender={(renderProps) => (
                                <LogoutButton
                                    type="primary"
                                    size="small"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    {t('AppBar.logout')}
                                </LogoutButton>
                            )}
                        />
                    ) : (
                        <LogoutButton
                            type="primary"
                            size="small"
                            onClick={logout}
                        >
                            {t('AppBar.logout')}
                        </LogoutButton>
                    )}
                </NotificationFlex>
            </HideWrapper>
        </Header>
    );
};

export default AppBar;
