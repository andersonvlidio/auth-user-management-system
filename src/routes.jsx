import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import AuthenticateToken from './components/AuthenticateToken';

const NavRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <AuthenticateToken>
              <Dashboard />
            </AuthenticateToken>
          }
        />
        
        <Route
          path="/userprofile/:id"
          element={
            <AuthenticateToken>
              <UserProfile />
            </AuthenticateToken>
          }
        />

        <Route
          path="/register"
          element={
            <AuthenticateToken>
              <Register />
            </AuthenticateToken>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default NavRoutes;
