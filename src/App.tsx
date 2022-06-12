import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicPage from 'pages/PublicPage/PublicPage';
import JobsPage from 'pages/JobsPage';
import MainLayout from 'components/MainLayout';
import ForgotPassword from 'pages/ForgotPassword';
import { Paths } from 'router/paths';
import ResetPassword from 'pages/ResetPassword';
import SendProposal from 'pages/SendProposal';
import ContactInfo from 'pages/ContactInfo';
import HomePage from 'pages/HomePage';
import AuthForm from 'components/AuthForm';
import RolePage from 'pages/RolePage';
import OneJobPage from 'pages/OneJobPage';
import SettingPage from 'pages/SettingPage';
import Protected from 'router/Protected';
import OffersPage from 'pages/OffersPage';
import Chat from 'pages/Chat';
import CreateJobPage from 'pages/CreateJobPage';
import ContactsPage from 'pages/ContractsPage';
import OwnerJobsPage from 'pages/OwnerJobsPage';
import TalentsPage from 'pages/TalentsPage';
import { AppContext, appSocket } from 'context';
import MyContacts from 'pages/MyContacts(JobOwner)';
import TestPage from './pages/testPage';

const App: React.FC = () => {
    const socket = useMemo(() => ({ socket: appSocket }), []);

    return (
        <AppContext.Provider value={socket}>
            <MainLayout>
                <Routes>
                    <Route element={<Protected />}>
                        <Route path={Paths.JOBS} element={<JobsPage />} />
                        <Route path={Paths.TALENT} element={<TalentsPage />} />
                        <Route path={Paths.OFFERS} element={<OffersPage />} />
                        <Route
                            path={Paths.OWNER_JOBS}
                            element={<OwnerJobsPage />}
                        />
                        <Route
                            path={Paths.MY_CONTRACTS}
                            element={<ContactsPage />}
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
                        <Route path={Paths.PROFILE} element={<PublicPage />} />
                        <Route path={Paths.TEST} element={<TestPage />} />
                        <Route
                            path={Paths.SEND_PROPOSAL}
                            element={<SendProposal />}
                        />
                        <Route path={Paths.CHAT} element={<Chat />} />
                        <Route
                            path={Paths.CREATE_JOB_PAGE}
                            element={<CreateJobPage />}
                        />
                        <Route
                            path={Paths.MY_CONTACTS}
                            element={<MyContacts />}
                        />
                    </Route>

                    <Route path={Paths.HOME} element={<HomePage />} />
                    <Route path={Paths.SIGN_UP} element={<AuthForm />} />
                    <Route path={Paths.SETTING_ID} element={<SettingPage />} />
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
