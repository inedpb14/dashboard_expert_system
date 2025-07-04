// src/pages/KelasPage.jsx

import React, { useState, useEffect } from "react";
import {
  getAllKelas,
  createKelas,
  updateKelas,
  deleteKelas,
} from "../../services/api";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const KelasPage = () => {
  const [kelasList, setKelasList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // State untuk form (bisa untuk create atau update)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKelas, setCurrentKelas] = useState(null); // null untuk mode create, object untuk mode update
  const [formData, setFormData] = useState({ namaKelas: "", deskripsi: "" });

  // Fungsi untuk mengambil data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllKelas();
      setKelasList(response.data);
    } catch (err) {
      setError("Gagal memuat data kelas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk membuka modal
  const handleOpenModal = (kelas = null) => {
    setCurrentKelas(kelas);
    if (kelas) {
      setFormData({ namaKelas: kelas.namaKelas, deskripsi: kelas.deskripsi });
    } else {
      setFormData({ namaKelas: "", deskripsi: "" });
    }
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentKelas(null);
    setError("");
  };

  // Fungsi untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (currentKelas) {
        // Mode Update
        await updateKelas(currentKelas._id, formData);
        alert("Kelas berhasil diperbarui!");
      } else {
        // Mode Create
        await createKelas(formData);
        alert("Kelas berhasil ditambahkan!");
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || "Operasi gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk delete
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus kelas ini? Ini mungkin mempengaruhi data siswa yang terkait."
      )
    ) {
      try {
        await deleteKelas(id);
        alert("Kelas berhasil dihapus.");
        fetchData();
      } catch (err) {
        alert("Gagal menghapus kelas.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Manajemen Kelas
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={18} /> Tambah Kelas Baru
        </button>
      </div>

      {/* Tabel Daftar Kelas */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-800 dark:bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Nama Kelas
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm">
                  Deskripsi
                </th>
                <th className="py-3 px-4 uppercase font-semibold text-sm text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {kelasList.map((kelas) => (
                <tr
                  key={kelas._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-3 px-4 font-semibold">{kelas.namaKelas}</td>
                  <td className="py-3 px-4">{kelas.deskripsi}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleOpenModal(kelas)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full text-xs"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(kelas._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full text-xs"
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

      {/* Modal untuk Create/Update */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {currentKelas ? "Edit Kelas" : "Tambah Kelas Baru"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="namaKelas"
                  className="block text-sm font-bold mb-2"
                >
                  Nama Kelas
                </label>
                <input
                  id="namaKelas"
                  type="text"
                  value={formData.namaKelas}
                  onChange={(e) =>
                    setFormData({ ...formData, namaKelas: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="deskripsi"
                  className="block text-sm font-bold mb-2"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs italic mb-4">{error}</p>
              )}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
                >
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelasPage;
