import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicPage from "pages/PublicPage/PublicPage";
import MainLayout from "components/MainLayout";
import TestPage from "./pages/testPage";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import VerifyEmail from "pages/ForgotPassword/components/VerifyEmail";
import HomePage from "pages/HomePage";
import AuthForm from "components/AuthForm";
import RolePage from "pages/RolePage";

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<AuthForm />} />
        <Route path="/select-role" element={<RolePage />} />
        <Route path="/profile" element={<PublicPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/forgotten_password" element={<ForgotPassword />} />
        <Route path="/reset_password/*" element={<ResetPassword />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
