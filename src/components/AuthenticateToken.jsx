import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const AuthenticateToken = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
      console.error('Token inválido:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/login" />;
  }
};

export default AuthenticateToken;