// src/pages/AturanEditPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAturanById,
  updateAturan,
  getAllGejala,
  getAllSolusi,
} from "../../services/api";
import { PlusCircle, Trash2, ArrowRight, Save, XCircle } from "lucide-react";

const AturanEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State untuk menyimpan semua pilihan yang tersedia
  const [gejalaList, setGejalaList] = useState([]);
  const [solusiList, setSolusiList] = useState([]);

  // State untuk membangun aturan yang sedang diedit
  const [kodeAturan, setKodeAturan] = useState("");
  const [namaAturan, setNamaAturan] = useState("");
  const [gejalaDipilih, setGejalaDipilih] = useState([]); // Daftar objek gejala di kotak "IF"
  const [solusiDipilih, setSolusiDipilih] = useState(""); // Solusi yang dipilih

  // State untuk dropdown tambah gejala
  const [gejalaToAdd, setGejalaToAdd] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Mengambil semua data awal saat komponen dimuat
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [aturanRes, gejalaRes, solusiRes] = await Promise.all([
          getAturanById(id),
          getAllGejala(),
          getAllSolusi(),
        ]);

        const aturanData = aturanRes.data;
        // Mengisi semua state form dengan data yang ada
        setKodeAturan(aturanData.kodeAturan);
        setNamaAturan(aturanData.namaAturan);
        setGejalaDipilih(aturanData.gejala); // Simpan seluruh objek gejala
        setSolusiDipilih(aturanData.solusi._id);

        setGejalaList(gejalaRes.data);
        setSolusiList(solusiRes.data);
      } catch (err) {
        setError("Gagal memuat data aturan untuk diedit.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [id]);

  // Fungsi untuk menambah gejala ke kotak "IF"
  const handleAddGejala = () => {
    if (gejalaToAdd && !gejalaDipilih.find((g) => g._id === gejalaToAdd)) {
      const gejala = gejalaList.find((g) => g._id === gejalaToAdd);
      if (gejala) {
        setGejalaDipilih([...gejalaDipilih, gejala]);
      }
      setGejalaToAdd(""); // Reset dropdown
    }
  };

  // Fungsi untuk menghapus gejala dari kotak "IF"
  const handleRemoveGejala = (idToRemove) => {
    setGejalaDipilih(gejalaDipilih.filter((g) => g._id !== idToRemove));
  };

  // Fungsi untuk menyimpan perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gejalaDipilih.length === 0 || !solusiDipilih) {
      setError("Pilih minimal satu gejala dan satu solusi.");
      return;
    }
    setIsLoading(true);
    setError("");

    const aturanDataToUpdate = {
      kodeAturan,
      namaAturan,
      gejala: gejalaDipilih.map((g) => g._id), // Kirim hanya array ID ke backend
      solusi: solusiDipilih,
    };

    try {
      await updateAturan(id, aturanDataToUpdate);
      alert("Aturan berhasil diperbarui!");
      navigate("/aturan");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui aturan.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Memuat data aturan...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Edit Aturan
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Panel Info Aturan */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Informasi Aturan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={kodeAturan}
              onChange={(e) => setKodeAturan(e.target.value)}
              placeholder="Kode Aturan"
              className="shadow border rounded w-full py-2 px-3"
              required
            />
            <input
              value={namaAturan}
              onChange={(e) => setNamaAturan(e.target.value)}
              placeholder="Nama/Deskripsi Aturan"
              className="shadow border rounded w-full py-2 px-3"
              required
            />
          </div>
        </div>

        {/* Panel Pembangun Aturan  */}
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <div className="mb-6 ">
            <label className="block text-gray-700 dark:text-gray-100 font-bold mb-2">
              1. Tambah/Kurangi Kondisi "IF" (Gejala)
            </label>
            <div className="flex items-center gap-2">
              <select
                value={gejalaToAdd}
                onChange={(e) => setGejalaToAdd(e.target.value)}
                className="flex-grow shadow border rounded w-full py-2 px-3"
              >
                <option value="">-- Pilih gejala untuk ditambahkan --</option>
                {gejalaList.map((g) => (
                  <option
                    className="bg-white dark:bg-gray-800"
                    key={g._id}
                    value={g._id}
                  >
                    {g.kodeGejala} - {g.namaGejala}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddGejala}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center gap-1"
              >
                <PlusCircle size={18} /> Tambah
              </button>
            </div>
          </div>

          <div className="min-h-[100px] border-2 border-dashed rounded-lg p-4 space-y-2 bg-gray-50 dark:bg-gray-900/50">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">
              IF (Pertanyaan yang telah di pilih):
            </h3>
            {gejalaDipilih.length > 0 ? (
              gejalaDipilih.map((g) => (
                <div
                  key={g._id}
                  className="flex items-center justify-between bg-white dark:bg-gray-700 p-2 rounded shadow-sm animate-fade-in"
                >
                  <span>
                    {g.kodeGejala}: {g.namaGejala}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveGejala(g._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">Kotak IF masih kosong...</p>
            )}
          </div>

          <div className="flex justify-center py-4">
            <ArrowRight size={24} className="text-gray-400" />
          </div>

          <div>
            <label className="block text-gray-800 dark:text-gray-100 font-bold mb-2">
              2. Pilih Kesimpulan "THEN" (Solusi)
            </label>
            <select
              value={solusiDipilih}
              onChange={(e) => setSolusiDipilih(e.target.value)}
              className="shadow  bg-white dark:bg-gray-800 border rounded w-full py-2 px-3"
              required
            >
              <option value="">-- Pilih Solusi --</option>
              {solusiList.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.kodeSolusi} - {s.namaSolusi}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4">
          {error && (
            <p className="text-red-500 text-sm mr-4 self-center">{error}</p>
          )}
          <button
            type="button"
            onClick={() => navigate("/aturan")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <XCircle size={18} /> Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-blue-400 flex items-center gap-2"
          >
            <Save size={18} /> {isLoading ? "Menyimpan..." : "Update Aturan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AturanEditPage;
