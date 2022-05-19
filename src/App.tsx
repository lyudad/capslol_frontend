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
import Chat from 'pages/Chat';
import TestPage from './pages/testPage';

const App: React.FC = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-up" element={<AuthForm />} />
                <Route path="/select-role" element={<RolePage />} />
                <Route path="/profile" element={<PublicPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route
                    path="/forgotten_password"
                    element={<ForgotPassword />}
                />
                <Route path="/reset_password/*" element={<ResetPassword />} />
                <Route path="/send_proposal/" element={<SendProposal />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/contact_info" element={<ContactInfo />} />
                <Route path="/job" element={<OneJobPage />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </MainLayout>
    );
};

export default App;
