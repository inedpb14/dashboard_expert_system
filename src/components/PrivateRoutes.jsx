// src/components/PrivateRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // 1. Ambil informasi pengguna dari localStorage.
  //    localStorage menyimpan data sebagai string, jadi kita perlu mengubahnya kembali menjadi objek.
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 2. Periksa apakah userInfo ada (artinya pengguna sudah login).
  //    Jika ya, tampilkan halaman yang diminta (menggunakan <Outlet />).
  //    Jika tidak, arahkan pengguna ke halaman login (menggunakan <Navigate />).
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
