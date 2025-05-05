import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';

const NavRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/userprofile/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default NavRoutes;
