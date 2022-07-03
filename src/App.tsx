import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicPage from 'pages/PublicPage/PublicPage';
import JobsPage from 'pages/JobsPage';
import MainLayout from 'components/MainLayout';
import ForgotPassword from 'pages/ForgotPassword';
import { Paths } from 'router/paths';
import ResetPassword from 'pages/ResetPassword';
import { userRole } from 'constants/index';
import SendProposal from 'pages/SendProposal';
import ContactInfo from 'pages/ContactInfo';
import HomePage from 'pages/HomePage';
import AuthForm from 'components/AuthForm';
import RolePage from 'pages/RolePage';
import OneJobPage from 'pages/OneJobPage';
import SettingPage from 'pages/SettingPage';
import { Protected, ProtectedRoute } from 'router/Protected';
import OffersPage from 'pages/OffersPage';
import Chat from 'pages/Chat';
import CreateJobPage from 'pages/CreateJobPage';
import ContactsPage from 'pages/ContractsPage';
import OwnerJobsPage from 'pages/OwnerJobsPage';
import TalentsPage from 'pages/TalentsPage';
import { AppContext, appSocket } from 'context';
import MyContacts from 'pages/MyContacts(JobOwner)';
import { useAppSelector } from 'hooks/redux';
import { TChatArgument } from 'pages/Chat/interfaces';
import { useGetFilteredJobsQuery } from 'store/apis/jobs';
import { useGetFreelancerProfileQuery } from 'store/apis/publicProfile';
import EmailConfirmation from 'pages/EmailConfirmation';
import SpinnerWrapper from 'components/Spinner/SpinnerWrapper';

const App: React.FC = () => {
    const [jobsLength, setJobsLength] = useState<number | null>(null);
    const [currentChat, setCurrentChat] = useState<undefined | TChatArgument>(
        undefined
    );

    const context = useMemo(
        () => ({ socket: appSocket, currentChat, setCurrentChat }),
        [currentChat]
    );

    const role = useAppSelector((state) => state.auth.user?.role);

    const userId = useAppSelector((state) => state.auth.user?.id);

    const profilePath = `/profile/${userId}`;

    const setProfilePath = `/setting/${userId}`;

    const { data: userProfile, isLoading } =
        useGetFreelancerProfileQuery(userId);

    const profileBool = !!userProfile;

    const { data: ownJobs, isLoading: loading } = useGetFilteredJobsQuery({
        ownerId: userId,
    });

    useEffect(() => {
        if (ownJobs) {
            setJobsLength(ownJobs.data.length);
        }
    }, [ownJobs, userId]);

    return (
        <AppContext.Provider value={context}>
            <MainLayout>
                <SpinnerWrapper isLoading={isLoading || loading}>
                    <Routes>
                        <Route element={<Protected />}>
                            <Route path="*" element={<HomePage />} />

                            <Route
                                path="/logo"
                                element={
                                    <ProtectedRoute
                                        boolValue={
                                            !(
                                                role === userRole.freelancer &&
                                                !profileBool
                                            ) && !!role
                                        }
                                        redirectPath={Paths.TALENT}
                                    >
                                        <SettingPage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path={setProfilePath}
                                element={
                                    <ProtectedRoute
                                        boolValue={role === userRole.owner}
                                        redirectPath={Paths.TALENT}
                                    >
                                        <SettingPage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path={profilePath}
                                element={
                                    <ProtectedRoute
                                        boolValue={
                                            role === userRole.owner &&
                                            !jobsLength
                                        }
                                        redirectPath={Paths.OWNER_JOBS}
                                    >
                                        <PublicPage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path={Paths.JOBS}
                                element={
                                    <ProtectedRoute
                                        boolValue={
                                            !(
                                                role === userRole.freelancer &&
                                                profileBool
                                            )
                                        }
                                        redirectPath={setProfilePath}
                                    >
                                        <JobsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={Paths.OFFERS}
                                element={
                                    <ProtectedRoute
                                        boolValue={
                                            !(
                                                role === userRole.freelancer &&
                                                profileBool
                                            )
                                        }
                                        redirectPath={setProfilePath}
                                    >
                                        <OffersPage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path={Paths.MY_CONTRACTS}
                                element={
                                    <ProtectedRoute
                                        boolValue={
                                            !(
                                                (role === userRole.freelancer &&
                                                    profileBool) ||
                                                (role === userRole.owner &&
                                                    !!jobsLength)
                                            )
                                        }
                                        redirectPath={setProfilePath}
                                    >
                                        <ContactsPage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path={Paths.CHAT}
                                element={
                                    <ProtectedRoute
                                        boolValue={
                                            !(
                                                (role === userRole.freelancer &&
                                                    profileBool) ||
                                                (role === userRole.owner &&
                                                    !!jobsLength)
                                            )
                                        }
                                        redirectPath={setProfilePath}
                                    >
                                        <Chat />
                                    </ProtectedRoute>
                                }
                            />

                            {jobsLength !== null && (
                                <>
                                    <Route
                                        path={Paths.OWNER_JOBS}
                                        element={
                                            <ProtectedRoute
                                                boolValue={
                                                    !(role === userRole.owner)
                                                }
                                                redirectPath={
                                                    Paths.CREATE_JOB_PAGE
                                                }
                                            >
                                                <OwnerJobsPage />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path={Paths.TALENTS_PROFILE}
                                        element={
                                            <ProtectedRoute
                                                boolValue={
                                                    !(
                                                        role ===
                                                            userRole.owner &&
                                                        !!jobsLength
                                                    )
                                                }
                                                redirectPath={
                                                    Paths.CREATE_JOB_PAGE
                                                }
                                            >
                                                <PublicPage />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path={Paths.MY_CONTACTS}
                                        element={
                                            <ProtectedRoute
                                                boolValue={
                                                    role !==
                                                        userRole.freelancer &&
                                                    !jobsLength
                                                }
                                                redirectPath={
                                                    Paths.CREATE_JOB_PAGE
                                                }
                                            >
                                                <MyContacts />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path={Paths.CREATE_JOB_PAGE}
                                        element={
                                            <ProtectedRoute
                                                boolValue={
                                                    !(
                                                        (role ===
                                                            userRole.owner &&
                                                            !jobsLength) ||
                                                        (role ===
                                                            userRole.owner &&
                                                            !jobsLength)
                                                    )
                                                }
                                                redirectPath={Paths.JOBS}
                                            >
                                                <CreateJobPage />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path={Paths.TALENT}
                                        element={
                                            <ProtectedRoute
                                                boolValue={
                                                    !(
                                                        role ===
                                                            userRole.owner &&
                                                        !!jobsLength
                                                    )
                                                }
                                                redirectPath={
                                                    Paths.CREATE_JOB_PAGE
                                                }
                                            >
                                                <TalentsPage />
                                            </ProtectedRoute>
                                        }
                                    />
                                </>
                            )}

                            <Route
                                path={Paths.SEND_PROPOSAL}
                                element={
                                    <ProtectedRoute
                                        boolValue={
                                            !(
                                                role === userRole.freelancer &&
                                                profileBool
                                            )
                                        }
                                        redirectPath={Paths.CREATE_JOB_PAGE}
                                    >
                                        <SendProposal />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path={Paths.CONTACT_INFO}
                                element={<ContactInfo />}
                            />

                            <Route
                                path={Paths.JOB_PAGE}
                                element={<OneJobPage />}
                            />

                            <Route
                                path={Paths.SELECT_ROLE}
                                element={<RolePage />}
                            />
                        </Route>

                        <Route path={Paths.SIGN_UP} element={<AuthForm />} />

                        <Route
                            path={Paths.FORGOTTEN_PASSWORD}
                            element={<ForgotPassword />}
                        />
                        <Route
                            path={Paths.RESET_PASSWORD}
                            element={<ResetPassword />}
                        />

                        <Route path={Paths.HOME} element={<HomePage />} />

                        <Route
                            path={Paths.CONFIRM_EMAIL}
                            element={<EmailConfirmation />}
                        />
                    </Routes>
                </SpinnerWrapper>
            </MainLayout>
        </AppContext.Provider>
    );
};

export default App;
