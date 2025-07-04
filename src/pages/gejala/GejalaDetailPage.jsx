// src/pages/GejalaDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGejalaById, updateGejala, getAllKategori } from "../../services/api.js";

const GejalaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kategoriList, setKategoriList] = useState([]);
  const [kodeGejala, setKodeGejala] = useState("");
  const [namaGejala, setNamaGejala] = useState("");
  const [kategoriId, setKategoriId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [gejalaRes, kategoriRes] = await Promise.all([
          getGejalaById(id),
          getAllKategori(),
        ]);
        const gejala = gejalaRes.data;
        setKodeGejala(gejala.kodeGejala);
        setNamaGejala(gejala.namaGejala);
        setKategoriId(gejala.kategori._id);
        setKategoriList(kategoriRes.data);
      } catch (err) {
        setError("Gagal memuat data.");
      }
    };
    fetchInitialData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateGejala(id, { kodeGejala, namaGejala, kategoriId });
      alert("Gejala berhasil diperbarui!");
      navigate("/gejala");
    } catch (err) {
      setError("Gagal memperbarui gejala.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Edit Gejala
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Kode Gejala
              </label>
              <input
                type="text"
                value={kodeGejala}
                onChange={(e) => setKodeGejala(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Nama Gejala
              </label>
              <input
                type="text"
                value={namaGejala}
                onChange={(e) => setNamaGejala(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Kategori
              </label>
              <select
                value={kategoriId}
                onChange={(e) => setKategoriId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                required
              >
                {kategoriList.map((k) => (
                  <option key={k._id} value={k._id}>
                    {k.namaKategori}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
          <div className="mt-6 flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? "Menyimpan..." : "Update Gejala"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/gejala")}
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

export default GejalaDetailPage;
