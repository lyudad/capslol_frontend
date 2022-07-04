import { useMemo, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';

import { logOut } from 'store/slices/auth/auth.slice';
import { useLazyGetJobsByOwnerQuery } from 'store/apis/jobs';
import { useLazyGetFreelancerProfileQuery } from 'store/apis/publicProfile';
import { Paths } from 'router/paths';
import { userRole } from 'constants/index';
import { useDispatch } from 'react-redux';
import avatar from 'assets/avatar.png';
import { HideWrapper } from 'components/HideWrapper/styles';
import { StyledImg } from 'pages/MyContacts(JobOwner)/styles';
import { Profile } from 'store/apis/publicProfile/publicProfile.types';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';
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
    const [jobsOwnLength, setJobsOwnLength] = useState<number>(0);
    const [userProfile, setUserProfile] = useState<Profile>();
    const [profilePath, setProfilePath] = useState<string>('');

    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const isAuth = useAppSelector((state) => state.auth.isLoggedIn);

    const role = useAppSelector((state) => state.auth.user?.role);

    const user = useAppSelector((state) => state.auth.user);

    const userId = useAppSelector((state) => state.auth.user?.id);

    const [getJobs, { isLoading: loading }] = useLazyGetJobsByOwnerQuery();

    const [getProfile, { isLoading }] = useLazyGetFreelancerProfileQuery();

    useMemo(async () => {
        if (userId) {
            const jobs = await getJobs(userId).unwrap();
            const profileUser = await getProfile(userId).unwrap();
            setJobsOwnLength(jobs.length);
            setUserProfile(profileUser);
            setProfilePath(`profile/${userId}`);
        }
    }, [userId, getJobs, getProfile]);

    useMemo(async () => {
        if (userId && role === userRole.owner) {
            const jobs = await getJobs(userId).unwrap();
            setJobsOwnLength(jobs.length);
        }
    }, [userId, getJobs, role]);

    const logout = (): void => {
        dispatch(logOut());
        navigate(Paths.HOME);
    };

    return (
        <Header>
            <SpinnerWrapper isLoading={isLoading || loading}>
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
                            showWhen={
                                role === userRole.freelancer && !!userProfile
                            }
                        >
                            <NavLink to={Paths.JOBS} className="navLink">
                                {t('AppBar.jobs')}
                            </NavLink>
                        </HideWrapper>
                        <HideWrapper
                            showWhen={
                                role === userRole.freelancer && !!userProfile
                            }
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
                            showWhen={
                                role === userRole.owner && !!jobsOwnLength
                            }
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
                            <NavLink
                                to={Paths.MY_CONTRACTS}
                                className="navLink"
                            >
                                {t('AppBar.myContracts')}
                            </NavLink>
                        </HideWrapper>
                        <HideWrapper
                            showWhen={
                                role === userRole.owner && !!jobsOwnLength
                            }
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
                            <NavLink to={Paths.CHAT} className="navLink">
                                {t('AppBar.chat')}
                            </NavLink>
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
                        <LogoutButton
                            type="primary"
                            size="small"
                            onClick={logout}
                        >
                            {t('AppBar.logout')}
                        </LogoutButton>
                    </NotificationFlex>
                </HideWrapper>
            </SpinnerWrapper>
        </Header>
    );
};

export default AppBar;
