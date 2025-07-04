// src/pages/RiwayatAdminPage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllRiwayat, deleteRiwayatById } from "../../services/api";
import { Eye, Trash2, Search } from "lucide-react";

const RiwayatAdminPage = () => {
  const [riwayatList, setRiwayatList] = useState([]);
  const [filteredRiwayat, setFilteredRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllRiwayat();
      setRiwayatList(response.data);
      setFilteredRiwayat(response.data); // Set data awal untuk filter
    } catch (error) {
      console.error("Gagal memuat data riwayat:", error);
      alert("Gagal memuat data riwayat.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Effect untuk melakukan filter setiap kali searchTerm atau data asli berubah
  useEffect(() => {
    const results = riwayatList.filter((riwayat) =>
      riwayat.siswa?.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRiwayat(results);
  }, [searchTerm, riwayatList]);

  // Fungsi untuk menghapus riwayat
  const handleDelete = async (id) => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus catatan riwayat ini?")
    ) {
      try {
        await deleteRiwayatById(id);
        alert("Riwayat berhasil dihapus.");
        fetchData(); // Ambil ulang data terbaru dari server
      } catch (err) {
        alert("Gagal menghapus riwayat.");
      }
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Memuat data riwayat...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Manajemen Riwayat Konsultasi
      </h1>

      {/* Fitur Pencarian */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama siswa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full sm:w-72 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Tabel Data Riwayat */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-800 dark:bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left">
                  Siswa
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left">
                  Kelas
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left">
                  Hasil Solusi
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left">
                  Tanggal
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {filteredRiwayat.map((riwayat) => (
                <tr
                  key={riwayat._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-3 px-4 font-semibold">
                    {riwayat.siswa?.username || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {riwayat.siswa?.kelas?.namaKelas || (
                      <span className="text-gray-400 italic">
                        Belum ada kelas
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {riwayat.hasilSolusi?.namaSolusi || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(riwayat.createdAt).toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Link
                      to={`/riwayat/detail/${riwayat._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full inline-flex items-center justify-center"
                      title="Lihat Detail"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(riwayat._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRiwayat.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              Tidak ada data riwayat yang cocok.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiwayatAdminPage;
