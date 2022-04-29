import React from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "components/AppBar";
import HomePage from "pages/HomePage";
import TestPage from "./pages/testPage";
import Settings from "./pages/Settings"

const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/settings" element={<Settings />}/>
      </Routes>
    </>
  );
};

export default App;
