// src/pages/RiwayatDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDetailRiwayat } from "../../services/api";
import {
  User,
  School,
  ClipboardList,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";

const RiwayatDetailPage = () => {
  const { id } = useParams();
  const [riwayat, setRiwayat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getDetailRiwayat(id);
        setRiwayat(response.data);
      } catch (error) {
        console.error("Gagal memuat detail riwayat:", error);
        alert("Gagal memuat detail riwayat.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="text-center p-10">Memuat detail...</div>;
  }

  if (!riwayat) {
    return (
      <div className="text-center p-10">Data riwayat tidak ditemukan.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/riwayat"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Detail Riwayat Konsultasi
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Konsultasi oleh {riwayat.siswa?.username} pada{" "}
            {new Date(riwayat.createdAt).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Info Siswa */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <User /> Info Siswa
          </h2>
          <p>
            <strong>Username:</strong> {riwayat.siswa?.username}
          </p>
          <p>
            <strong>Kelas:</strong> {riwayat.siswa?.kelas?.namaKelas || "N/A"}
          </p>
          <div>
            <p>
              <strong>Biografi:</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
              {riwayat.siswa?.biografi || "Biografi belum diisi."}
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Detail Konsultasi */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gejala yang Dipilih */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <ClipboardList /> Gejala yang Dipilih
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {riwayat.gejalaYangDipilih.map((gejala) => (
                <li key={gejala._id}>
                  <strong>({gejala.kodeGejala})</strong> {gejala.namaGejala}
                </li>
              ))}
            </ul>
          </div>

          {/* Hasil Solusi */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Lightbulb /> Hasil Solusi
            </h2>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              ({riwayat.hasilSolusi.kodeSolusi}){" "}
              {riwayat.hasilSolusi.namaSolusi}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {riwayat.hasilSolusi.deskripsi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatDetailPage;
