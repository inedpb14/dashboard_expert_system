// src/pages/KategoriPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// icon
import { PencilRuler, Trash2 } from "lucide-react";

// mengambil data dari backend
import { getAllKategori, createKategori, deleteKategori } from "../../services/api";


const KategoriPage = () => {
  const [kategoris, setKategoris] = useState([]);
  const [namaKategori, setNamaKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    // Minta konfirmasi sebelum menghapus
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await deleteKategori(id);
        alert("Kategori berhasil dihapus.");
        fetchKategori(); // Refresh data setelah berhasil hapus
      } catch (err) {
        alert("Gagal menghapus kategori.");
        // console.error(err);
      }
    }
  };

  const fetchKategori = async () => {
    try {
      const response = await getAllKategori();
      setKategoris(response.data);
    } catch (err) {
      setError("Gagal memuat data kategori.");
      // console.error(err);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await createKategori({ namaKategori, deskripsi });
      setNamaKategori("");
      setDeskripsi("");
      alert("Kategori berhasil ditambahkan!");
      fetchKategori(); // Refresh daftar kategori
    } catch (err) {
      setError("Gagal menambahkan kategori. Mungkin nama sudah ada.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Manajemen Kategori
      </h1>

      {/* Form untuk menambah kategori baru */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Tambah Kategori Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-100 font-bold mb-2"
              htmlFor="namaKategori"
            >
              Nama Kategori
            </label>
            <input
              id="namaKategori"
              type="text"
              value={namaKategori}
              onChange={(e) => setNamaKategori(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 dark:text-gray-100 font-bold mb-2"
              htmlFor="deskripsi"
            >
              Deskripsi (Opsional)
            </label>
            <textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
          >
            {isLoading ? "Menyimpan..." : "Simpan Kategori"}
          </button>
        </form>
      </div>

      {/* Tabel untuk menampilkan daftar kategori */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4  dark:text-gray-100 text-gray-800">
          Daftar Kategori
        </h2>
        <table className="min-w-full bg-white dark:bg-gray-900 dark:text-gray-100">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Nama Kategori
              </th>
              <th className="w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Deskripsi
              </th>
              <th className="w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-100">
            {kategoris.map((kategori) => (
              <tr key={kategori._id} className="border-b dark:border-gray-700">
                <td className="py-3 px-4">
                  {/* Buat nama kategori menjadi link ke halaman detail */}
                  <Link
                    to={`/kategori/${kategori._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {kategori.namaKategori}
                  </Link>
                </td>
                <td className="py-3 px-4">{kategori.deskripsi}</td>
                <td className="flex gap-1 py-3 px-4 text-center">
                  {/* Tombol Edit akan menjadi link juga */}
                  <Link
                    to={`/kategori/${kategori._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full text-xs"
                  >
                    <PencilRuler size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(kategori._id)}
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
  );
};

export default KategoriPage;
