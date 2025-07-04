// src/pages/NotFoundPage.jsx

import React from "react";
import { Link } from "react-router-dom"; // Import Link untuk navigasi

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0, color: "#2563eb" }}>404</h1>
      <h2 style={{ fontSize: "2rem", margin: "0 0 1rem 0" }}>
        Halaman Tidak Ditemukan
      </h2>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
};

export default NotFoundPage;
