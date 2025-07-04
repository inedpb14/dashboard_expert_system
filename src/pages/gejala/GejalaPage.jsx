// src/pages/GejalaPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllGejala, createGejala, getAllKategori, deleteGejala, } from "../../services/api";

// icon
import { PencilRuler, Trash2 } from "lucide-react";

const GejalaPage = () => {
  const [gejalaList, setGejalaList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);

  // State untuk form
  const [kodeGejala, setKodeGejala] = useState("");
  const [namaGejala, setNamaGejala] = useState("");
  const [kategoriId, setKategoriId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [gejalaRes, kategoriRes] = await Promise.all([
        getAllGejala(),
        getAllKategori(),
      ]);
      setGejalaList(gejalaRes.data);
      setKategoriList(kategoriRes.data);
      if (kategoriRes.data.length > 0) {
        setKategoriId(kategoriRes.data[0]._id); // Set default value untuk dropdown
      }
    } catch (err) {
      setError("Gagal memuat data.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus gejala ini?")) {
      try {
        await deleteGejala(id);
        alert("Gejala berhasil dihapus.");
        fetchData(); // Refresh data
      } catch (err) {
        alert("Gagal menghapus gejala.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kategoriId) {
      setError("Silakan pilih kategori terlebih dahulu.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await createGejala({ kodeGejala, namaGejala, kategoriId });
      setKodeGejala("");
      setNamaGejala("");
      alert("Gejala berhasil ditambahkan!");
      fetchData(); // Refresh data
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan gejala.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Manajemen Gejala
      </h1>

      {/* Form Tambah Gejala */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Tambah Gejala Baru
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="kodeGejala"
              >
                Kode Gejala
              </label>
              <input
                id="kodeGejala"
                type="text"
                value={kodeGejala}
                onChange={(e) => setKodeGejala(e.target.value)}
                placeholder="Contoh: G01"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="namaGejala"
              >
                Nama Gejala (Pertanyaan)
              </label>
              <input
                id="namaGejala"
                type="text"
                value={namaGejala}
                onChange={(e) => setNamaGejala(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="kategori"
              >
                Kategori
              </label>
              <select
                id="kategori"
                value={kategoriId}
                onChange={(e) => setKategoriId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                required
              >
                <option value="" disabled>
                  -- Pilih Kategori --
                </option>
                {kategoriList.map((k) => (
                  <option key={k._id} value={k._id}>
                    {k.namaKategori}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
            >
              {isLoading ? "Menyimpan..." : "Simpan Gejala"}
            </button>
          </div>
        </form>
      </div>

      {/* Tabel Daftar Gejala */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Daftar Gejala
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-800 dark:bg-gray-700 text-white">
              <tr>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Kode
                </th>
                <th className="w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Nama Gejala
                </th>
                <th className="w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Kategori
                </th>
                <th className="w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {gejalaList.map((gejala) => (
                <tr
                  key={gejala._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-3 px-4">{gejala.kodeGejala}</td>
                  <td className="py-3 px-4">
                    {" "}
                    <Link
                      to={`/gejala/${gejala._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {gejala.namaGejala}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    {gejala.kategori?.namaKategori || "N/A"}
                  </td>
                  <td className="flex gap-2 py-3 px-4 text-center">
                    <Link
                      to={`/gejala/${gejala._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 font-bold rounded-full text-xs"
                    >
                      <PencilRuler size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(gejala._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-full text-xs"
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

export default GejalaPage;
