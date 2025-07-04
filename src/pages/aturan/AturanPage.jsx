// src/pages/AturanPage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllAturan, deleteAturan } from "../../services/api";
import { PlusCircle, Trash2, PencilRuler } from "lucide-react";

const AturanPage = () => {
  const [aturanList, setAturanList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllAturan();
      setAturanList(response.data);
    } catch (error) {
      console.error("Gagal memuat data aturan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus aturan ini?")) {
      try {
        await deleteAturan(id);
        alert("Aturan berhasil dihapus.");
        fetchData(); // Refresh data setelah berhasil hapus
      } catch (err) {
        alert("Gagal menghapus aturan.");
      }
    }
  };

  if (isLoading) {
    return <div>Memuat data aturan...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Manajemen Aturan
        </h1>
        <Link
          to="/buat-aturan" // Link ke halaman pembuatan aturan yang baru
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={18} /> Buat Aturan Baru
        </Link>
      </div>

      {/* Tabel Daftar Aturan */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-800 dark:bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Kode
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Nama Aturan
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Kondisi (IF)
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Solusi (THEN)
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {aturanList.map((aturan) => (
                <tr
                  key={aturan._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-3 px-4 font-semibold">
                    {aturan.kodeAturan}
                  </td>
                  <td className="py-3 px-4">{aturan.namaAturan}</td>
                  <td className="py-3 px-4 text-sm">
                    {aturan.gejala.map((g) => g.kodeGejala).join(" & ")}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-green-600 dark:text-green-400">
                    {aturan.solusi.kodeSolusi}
                  </td>
                  <td className="flex justify-center py-3 px-4 text-center">
                    <Link
                      to={`/edit-aturan/${aturan._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                    >
                      <PencilRuler/>
                    </Link>
                    <button
                      onClick={() => handleDelete(aturan._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs"
                    >
                      <Trash2/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AturanPage;
