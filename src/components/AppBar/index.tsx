import { useMemo } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { logOut, setContractsCount } from 'store/slices/auth/auth.slice';
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

    const isGoogle = useAppSelector((state) => state.auth.user?.isGoogle);

    const profilePath = useMemo(() => {
        if (userId) {
            return `profile/${userId}`;
        }
        return '';
    }, [userId]);

    const messagesCount = useAppSelector((state) => state.auth.newMessageCount);

    const newProposalsCount = useAppSelector(
        (state) => state.auth.proposalsCount
    );
    const newOffersCount = useAppSelector((state) => state.auth.offersCount);

    const newInvitationsCount = useAppSelector(
        (state) => state.auth.invitationsCount
    );

    const contractsCount = useAppSelector((state) => state.auth.contractsCount);

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
                <HideWrapper
                    showWhen={
                        role === userRole.freelancer && !!userProfile && isAuth
                    }
                >
                    <NavLink to={Paths.JOBS} className="navLink">
                        {t('AppBar.jobs')}
                    </NavLink>
                </HideWrapper>
                <HideWrapper
                    showWhen={
                        role === userRole.freelancer && !!userProfile && isAuth
                    }
                >
                    <NavWrapper>
                        <NavLink to={Paths.OFFERS} className="navLink">
                            {t('AppBar.myOffers')}
                        </NavLink>
                        <LiveNotification
                            count={
                                newOffersCount +
                                newProposalsCount +
                                newInvitationsCount
                            }
                        />
                    </NavWrapper>
                </HideWrapper>

                <HideWrapper showWhen={role === userRole.owner && isAuth}>
                    <NavLink to={Paths.OWNER_JOBS} className="navLink">
                        {t('AppBar.myProjects')}
                    </NavLink>
                </HideWrapper>
                <HideWrapper
                    showWhen={
                        role === userRole.owner && !!jobsOwnLength && isAuth
                    }
                >
                    <NavLink to={Paths.TALENT} className="navLink">
                        {t('AppBar.Talents')}
                    </NavLink>
                </HideWrapper>
                <HideWrapper
                    showWhen={
                        (role === userRole.owner &&
                            !!jobsOwnLength &&
                            isAuth) ||
                        (role === userRole.freelancer &&
                            !!userProfile &&
                            isAuth)
                    }
                >
                    <NavWrapper onClick={() => dispatch(setContractsCount(0))}>
                        <NavLink to={Paths.MY_CONTRACTS} className="navLink">
                            {t('AppBar.myContracts')}
                        </NavLink>
                        <LiveNotification count={contractsCount} />
                    </NavWrapper>
                </HideWrapper>
                <HideWrapper
                    showWhen={
                        role === userRole.owner && !!jobsOwnLength && isAuth
                    }
                >
                    <NavLink to={Paths.MY_CONTACTS} className="navLink">
                        {t('AppBar.myContacts')}
                    </NavLink>
                </HideWrapper>
                <HideWrapper
                    showWhen={
                        (role === userRole.owner &&
                            !!jobsOwnLength &&
                            isAuth) ||
                        (role === userRole.freelancer &&
                            !!userProfile &&
                            isAuth)
                    }
                >
                    <NavWrapper>
                        <NavLink to={Paths.CHAT} className="navLink">
                            {t('AppBar.chat')}
                        </NavLink>
                        <LiveNotification count={messagesCount.length} />
                    </NavWrapper>
                </HideWrapper>

                <HideWrapper showWhen={role === userRole.freelancer && isAuth}>
                    <NavLink to={profilePath} className="navLink">
                        {t('AppBar.profile')}
                    </NavLink>
                    {/* </HideWrapper> */}
                </HideWrapper>
            </NavigationContainer>

            <NotificationFlex>
                <HideWrapper showWhen={isAuth}>
                    <LoggedName>
                        {t('AppBar.welcome')}
                        <span>
                            {user?.firstName} {user?.lastName}
                        </span>
                    </LoggedName>
                </HideWrapper>

                <HideWrapper showWhen={isAuth}>
                    <BarAvatarImg>
                        <StyledImg
                            src={userProfile?.profileImage || avatar}
                            alt=""
                        />
                    </BarAvatarImg>
                </HideWrapper>
                <HideWrapper showWhen={isAuth}>
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
                </HideWrapper>
            </NotificationFlex>
        </Header>
    );
};

export default AppBar;
