import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TestPage from './pages/testPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  </BrowserRouter>
);