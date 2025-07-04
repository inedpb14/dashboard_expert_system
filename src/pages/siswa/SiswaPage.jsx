// src/pages/SiswaPage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSiswa, deleteUser } from "../../services/api";
import { Edit, Trash2, UserPlus } from "lucide-react";

const SiswaPage = () => {
  const [siswaList, setSiswaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllSiswa();
      setSiswaList(response.data);
    } catch (error) {
      console.error("Gagal memuat data siswa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      try {
        await deleteUser(id);
        alert("Siswa berhasil dihapus.");
        fetchData(); // Refresh data tabel
      } catch (err) {
        alert("Gagal menghapus siswa.");
      }
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Memuat data siswa...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Manajemen Siswa
        </h1>
        {/* Tombol untuk mendaftar siswa baru bisa ditambahkan di sini jika diperlukan */}
        {/* <Link to="/siswa/baru" className="bg-blue-500 ..."><UserPlus /> Tambah Siswa</Link> */}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-800 dark:bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left">
                  Username
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left">
                  Kelas
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-left">
                  Terdaftar Sejak
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {siswaList.map((siswa) => (
                <tr
                  key={siswa._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-3 px-4 font-semibold">{siswa.username}</td>
                  <td className="py-3 px-4">
                    {siswa.kelas?.namaKelas || (
                      <span className="text-gray-400 italic">
                        Belum ada kelas
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(siswa.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Link
                      to={`/siswa-edit/${siswa._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(siswa._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    >
                      <Trash2 size={14} />
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

export default SiswaPage;
