/* eslint-disable no-unused-expressions */
import React, { useMemo, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IMessages, TChatArgument } from 'pages/Chat/interfaces';
import EmailConfirmation from 'pages/EmailConfirmation';
import {
    setContractsCount,
    setInvitationsCount,
    setNewMessageCount,
    setOffersCount,
} from 'store/slices/auth/auth.slice';

const App: React.FC = () => {
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

    const jobsLength = useAppSelector((state) => state.auth.ownerJobsLength);

    const profileBool = !!useAppSelector((state) => state.auth.profile);

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    const dispatch = useAppDispatch();

    const newMessCount = useAppSelector((state) => state.auth.newMessageCount);

    const offersCount = useAppSelector((state) => state.auth.offersCount);

    const contractsCount = useAppSelector((state) => state.auth.contractsCount);

    const invitationsCount = useAppSelector(
        (state) => state.auth.invitationsCount
    );

    appSocket.on(`msgToClient`, (response: IMessages) => {
        if (response.senderId) {
            if (
                !!response.content.includes('Hourly rate:') ||
                response.senderId.id !== userId
            ) {
                dispatch(
                    setNewMessageCount([...newMessCount, response.roomId.id])
                );
                response.isOffer && dispatch(setOffersCount(offersCount + 1));
            }
            response.content.includes('New contract signed:') &&
                dispatch(setContractsCount(contractsCount + 1));

            response.content.includes('Contract terminated:') &&
                dispatch(setContractsCount(contractsCount + 1));

            response.content.includes('New interview:') &&
                dispatch(setInvitationsCount(invitationsCount + 1));
        }
    });

    return (
        <AppContext.Provider value={context}>
            <MainLayout>
                <Routes>
                    <Route element={<Protected />}>
                        <Route
                            path="*"
                            element={
                                <ProtectedRoute
                                    boolValue={!!isLoggedIn}
                                    redirectPath={Paths.JOBS}
                                >
                                    <HomePage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={Paths.LOGO}
                            element={
                                <ProtectedRoute
                                    boolValue={!!role}
                                    redirectPath={Paths.HOME}
                                >
                                    <RolePage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={Paths.SELECT_ROLE}
                            element={
                                <ProtectedRoute
                                    boolValue={!!role}
                                    redirectPath={Paths.HOME}
                                >
                                    <RolePage />
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
                                        role === userRole.owner && !jobsLength
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
                                            redirectPath={Paths.CREATE_JOB_PAGE}
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
                                                    role === userRole.owner &&
                                                    !!jobsLength
                                                )
                                            }
                                            redirectPath={Paths.CREATE_JOB_PAGE}
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
                                                !(
                                                    role !==
                                                        userRole.freelancer &&
                                                    !!jobsLength
                                                )
                                            }
                                            redirectPath={Paths.CREATE_JOB_PAGE}
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
                                                role === userRole.freelancer
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
                                                    role === userRole.owner &&
                                                    !!jobsLength
                                                )
                                            }
                                            redirectPath={Paths.CREATE_JOB_PAGE}
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
                            element={
                                <ProtectedRoute
                                    boolValue={
                                        !(
                                            role === userRole.freelancer &&
                                            profileBool
                                        )
                                    }
                                    redirectPath={Paths.TALENT}
                                >
                                    <ContactInfo />
                                </ProtectedRoute>
                            }
                        />

                        <Route path={Paths.JOB_PAGE} element={<OneJobPage />} />
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

                    <Route
                        path={Paths.HOME}
                        element={
                            <ProtectedRoute
                                boolValue={!!isLoggedIn}
                                redirectPath={Paths.JOBS}
                            >
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={Paths.CONFIRM_EMAIL}
                        element={<EmailConfirmation />}
                    />
                </Routes>
            </MainLayout>
        </AppContext.Provider>
    );
};

export default App;
