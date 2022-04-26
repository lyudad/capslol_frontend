import React from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "components/AppBar";
import HomePage from "pages/HomePage";
import PublicPage from "pages/PublicPage/PublicPage";
import TestPage from "./pages/testPage";

const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<PublicPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
};

export default App;
