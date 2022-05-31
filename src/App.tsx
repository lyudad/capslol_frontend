import React from 'react';
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
import OffersPage from 'pages/OffersPage/index';
import Chat from 'pages/Chat';
import CreateJobPage from 'pages/CreateJobPage';
import TestPage from './pages/testPage';

const App: React.FC = () => {
    return (
        <MainLayout>
            <Routes>
                <Route element={<Protected />}>
                    <Route path={Paths.JOBS} element={<JobsPage />} />
                    <Route path={Paths.OFFERS} element={<OffersPage />} />
                    <Route
                        path={Paths.CONTACT_INFO}
                        element={<ContactInfo />}
                    />
                    <Route path={Paths.JOB_PAGE} element={<OneJobPage />} />
                    <Route path={Paths.SELECT_ROLE} element={<RolePage />} />
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
    );
};

export default App;
