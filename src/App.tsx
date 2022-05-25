import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicPage from 'pages/PublicPage/PublicPage';
import JobsPage from 'pages/JobsPage';
import MainLayout from 'components/MainLayout';
import ForgotPassword from 'pages/ForgotPassword';
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
import TestPage from './pages/testPage';

const App: React.FC = () => {
    return (
        <MainLayout>
            <Routes>
                <Route element={<Protected />}>
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/offers" element={<OffersPage />} />
                    <Route path="/contact_info" element={<ContactInfo />} />
                    <Route path="/job" element={<OneJobPage />} />
                    <Route path="/select-role" element={<RolePage />} />
                    <Route path="/profile" element={<PublicPage />} />
                    <Route path="/test" element={<TestPage />} />
                </Route>

                <Route path="/" element={<HomePage />} />
                <Route path="/sign-up" element={<AuthForm />} />
                <Route path="/setting/:id" element={<SettingPage />} />
                <Route
                    path="/forgotten_password"
                    element={<ForgotPassword />}
                />
                <Route path="/reset_password/*" element={<ResetPassword />} />
                <Route path="/send_proposal/" element={<SendProposal />} />
            </Routes>
        </MainLayout>
    );
};

export default App;
