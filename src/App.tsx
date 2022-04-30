import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicPage from "pages/PublicPage/PublicPage";
import AuthForm from "components/AuthForm";
import SignUpForm from "components/SignUpForm";
import MainLayout from "components/MainLayout";

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/profile" element={<PublicPage />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
