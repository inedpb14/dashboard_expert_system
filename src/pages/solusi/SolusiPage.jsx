// src/pages/SolusiPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSolusi, createSolusi, deleteSolusi } from "../../services/api";

// import icon 
import {Trash2, PencilRuler} from "lucide-react";

const SolusiPage = () => {
  const [solusiList, setSolusiList] = useState([]);

  // State untuk form
  const [kodeSolusi, setKodeSolusi] = useState("");
  const [namaSolusi, setNamaSolusi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSolusi = async () => {
    try {
      const response = await getAllSolusi();
      setSolusiList(response.data);
    } catch (err) {
      setError("Gagal memuat data solusi.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus solusi ini?")) {
      try {
        await deleteSolusi(id);
        alert("Solusi berhasil dihapus.");
        fetchSolusi(); // Refresh data
      } catch (err) {
        alert("Gagal menghapus solusi.");
      }
    }
  };

  useEffect(() => {
    fetchSolusi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await createSolusi({ kodeSolusi, namaSolusi, deskripsi });
      setKodeSolusi("");
      setNamaSolusi("");
      setDeskripsi("");
      alert("Solusi berhasil ditambahkan!");
      fetchSolusi(); // Refresh daftar solusi
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan solusi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Manajemen Solusi
      </h1>

      {/* Form Tambah Solusi Baru */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Tambah Solusi Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="kodeSolusi"
            >
              Kode Solusi
            </label>
            <input
              id="kodeSolusi"
              type="text"
              value={kodeSolusi}
              onChange={(e) => setKodeSolusi(e.target.value)}
              placeholder="Contoh: S01"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="namaSolusi"
            >
              Nama Solusi (Model Pembelajaran)
            </label>
            <input
              id="namaSolusi"
              type="text"
              value={namaSolusi}
              onChange={(e) => setNamaSolusi(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="deskripsi"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
          >
            {isLoading ? "Menyimpan..." : "Simpan Solusi"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Solusi */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Daftar Solusi
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-800 dark:bg-gray-700 text-white">
              <tr>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Kode
                </th>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Nama Solusi
                </th>
                <th className="w-2/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Deskripsi
                </th>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {solusiList.map((solusi) => (
                <tr
                  key={solusi._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-3 px-4">{solusi.kodeSolusi}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/solusi/${solusi._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {solusi.namaSolusi}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{solusi.deskripsi}</td>
                  <td className="flex gap-1 py-3 px-4 text-center">
                    <Link
                      to={`/solusi/${solusi._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                    >
                      <PencilRuler />
                    </Link>
                    <button
                      onClick={() => handleDelete(solusi._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs"
                    >
                      <Trash2 />
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

export default SolusiPage;
