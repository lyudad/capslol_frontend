import React, { useMemo } from 'react';
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

const App: React.FC = () => {
    const socket = useMemo(() => ({ socket: appSocket }), []);

    return (
        <AppContext.Provider value={socket}>
            <MainLayout>
                <Routes>
                    <Route element={<Protected />}>
                        <Route
                            path={Paths.JOBS}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.freelancer}
                                    redirectPath={Paths.HOME}
                                >
                                    <JobsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={Paths.OFFERS}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.freelancer}
                                    redirectPath={Paths.HOME}
                                >
                                    <OffersPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={Paths.OFFERS}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.freelancer}
                                    redirectPath={Paths.HOME}
                                >
                                    <JobsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={Paths.MY_CONTRACTS}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.freelancer}
                                    redirectPath={Paths.HOME}
                                >
                                    <ContactsPage />
                                </ProtectedRoute>
                            }
                        />
                        {/* <Route
                            path={Paths.PROFILE}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.freelancer}
                                    redirectPath={Paths.HOME}
                                >
                                    <PublicPage />
                                </ProtectedRoute>
                            }
                        /> */}
                        <Route path={Paths.PROFILE} element={<PublicPage />} />
                        <Route
                            path={Paths.SEND_PROPOSAL}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.freelancer}
                                    redirectPath={Paths.HOME}
                                >
                                    <SendProposal />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={Paths.TALENT}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.owner}
                                    redirectPath={Paths.HOME}
                                >
                                    <TalentsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={Paths.OWNER_JOBS}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.owner}
                                    redirectPath={Paths.HOME}
                                >
                                    <OwnerJobsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={Paths.CREATE_JOB_PAGE}
                            element={
                                <ProtectedRoute
                                    userRole={userRole.owner}
                                    redirectPath={Paths.HOME}
                                >
                                    <CreateJobPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={Paths.SETTING_ID}
                            element={<SettingPage />}
                        />
                        <Route
                            path={Paths.CONTACT_INFO}
                            element={<ContactInfo />}
                        />
                        <Route path={Paths.JOB_PAGE} element={<OneJobPage />} />
                        <Route
                            path={Paths.SELECT_ROLE}
                            element={<RolePage />}
                        />
                        <Route path={Paths.CHAT} element={<Chat />} />
                    </Route>
                    <Route path={Paths.HOME} element={<HomePage />} />
                    <Route path={Paths.SIGN_UP} element={<AuthForm />} />
                    <Route
                        path={Paths.FORGOTTEN_PASSWORD}
                        element={<ForgotPassword />}
                    />
                    <Route
                        path={Paths.RESET_PASSWORD}
                        element={<ResetPassword />}
                    />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </MainLayout>
        </AppContext.Provider>
    );
};

export default App;
