// src/pages/SolusiDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSolusiById, updateSolusi } from "../../services/api";

const SolusiDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    kodeSolusi: "",
    namaSolusi: "",
    deskripsi: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getSolusiById(id);
        setFormData(response.data);
      } catch (err) {
        setError("Gagal memuat detail solusi.");
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateSolusi(id, formData);
      alert("Solusi berhasil diperbarui!");
      navigate("/solusi");
    } catch (err) {
      setError("Gagal memperbarui solusi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Edit Solusi
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="kodeSolusi"
            >
              Kode Solusi
            </label>
            <input
              id="kodeSolusi"
              type="text"
              value={formData.kodeSolusi}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="namaSolusi"
            >
              Nama Solusi
            </label>
            <input
              id="namaSolusi"
              type="text"
              value={formData.namaSolusi}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3"
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
              value={formData.deskripsi}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? "Menyimpan..." : "Update Solusi"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/solusi")}
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

export default SolusiDetailPage;
