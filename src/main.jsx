// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// IMPORT AuthProvider
import { AuthProvider } from "./context/AuthContext.jsx";

// Import komponen & halaman
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MulaiKonsultasi from "./components/MulaiKonsultasi.jsx";
import BasisPengetahuan from "./components/BasisPengetahuan.jsx";
import Pengaturan from "./components/Pengaturan.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import KategoriPage from "./pages/kategori/KategoriPage.jsx";
import GejalaPage from "./pages/gejala/GejalaPage.jsx";
import GejalaDetailPage from "./pages/gejala/GejalaDetailPage.jsx";
import SolusiPage from "./pages/solusi/SolusiPage.jsx";
import SolusiDetailPage from "./pages/solusi/SolusiDetailPage.jsx";
import KategoriDetailPage from "./pages/kategori/DetailKategoriPage.jsx";
import AturanPage from "./pages/aturan/AturanPage.jsx";
import BuatAturanPage from "./pages/aturan/BuatAturanPage.jsx";
import AturanEditPage from "./pages/aturan/AturanEditPage.jsx";
import KelasPage from "./pages/kelas/kelasPage.jsx";
import SiswaPage from "./pages/siswa/SiswaPage.jsx";
import SiswaEditPage from "./pages/siswa/SiswaEditPage.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";
import RiwayatAdminPage from "./pages/riwayat/RiwayatAdminPage.jsx";
import RiwayatDetailPage from "./pages/riwayat/RiwayatDetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "konsultasi", element: <MulaiKonsultasi /> },
          { path: "basis-pengetahuan", element: <BasisPengetahuan /> },
          { path: "riwayat", element: <RiwayatAdminPage /> },
          { path: "riwayat/:id", element: <RiwayatDetailPage /> },
          { path: "pengaturan", element: <Pengaturan /> },
          { path: "kategori", element: <KategoriPage /> },
          { path: "gejala", element: <GejalaPage /> },
          { path: "solusi", element: <SolusiPage /> },
          { path: "aturan", element: <AturanPage /> },
          { path: "buat-aturan", element: <BuatAturanPage /> },
          { path: "edit-aturan/:id", element: <AturanEditPage /> },
          { path: "solusi/:id", element: <SolusiDetailPage /> },
          { path: "kategori/:id", element: <KategoriDetailPage /> },
          { path: "gejala/:id", element: <GejalaDetailPage /> },
          { path: "kelas", element: <KelasPage /> },
          { path: "siswa", element: <SiswaPage /> },
          { path: "siswa-edit/:id", element: <SiswaEditPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. BUNGKUS KEMBALI RouterProvider DENGAN AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
