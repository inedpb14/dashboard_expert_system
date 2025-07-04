// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Tampilkan loading saat context memeriksa auth
  }

  // Jika tidak loading dan user ada, izinkan akses. Jika tidak, redirect.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
