// src/pages/KategoriDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getKategoriById, updateKategori } from "../../services/api.js";

const KategoriDetailPage = () => {
  // useParams untuk mengambil 'id' dari URL
  const { id } = useParams();
  const navigate = useNavigate();

  const [namaKategori, setNamaKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getKategoriById(id);
        setNamaKategori(response.data.namaKategori);
        setDeskripsi(response.data.deskripsi);
      } catch (err) {
        setError("Gagal memuat detail kategori.");
      }
    };
    fetchDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateKategori(id, { namaKategori, deskripsi });
      alert("Kategori berhasil diperbarui!");
      navigate("/kategori"); // Kembali ke halaman daftar setelah update
    } catch (err) {
      setError("Gagal memperbarui kategori.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Edit Kategori
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="namaKategori"
            >
              Nama Kategori
            </label>
            <input
              id="namaKategori"
              type="text"
              value={namaKategori}
              onChange={(e) => setNamaKategori(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-6">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
            >
              {isLoading ? "Menyimpan..." : "Update Kategori"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/kategori")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KategoriDetailPage;
