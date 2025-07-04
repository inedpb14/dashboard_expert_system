// src/pages/BuatAturanPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAturan, getAllGejala, getAllSolusi } from "../../services/api";
import { PlusCircle, Trash2, ArrowRight, BrainCircuit } from "lucide-react";

const BuatAturanPage = () => {
  const navigate = useNavigate();

  // State untuk menyimpan semua pilihan yang tersedia
  const [gejalaList, setGejalaList] = useState([]);
  const [solusiList, setSolusiList] = useState([]);

  // State untuk membangun aturan baru
  const [gejalaDipilih, setGejalaDipilih] = useState([]); // Daftar gejala di kotak "IF"
  const [solusiDipilih, setSolusiDipilih] = useState(""); // Solusi yang dipilih
  const [kodeAturan, setKodeAturan] = useState("");
  const [namaAturan, setNamaAturan] = useState("");

  // State untuk dropdown gejala
  const [gejalaToAdd, setGejalaToAdd] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [gejalaRes, solusiRes] = await Promise.all([
          getAllGejala(),
          getAllSolusi(),
        ]);
        setGejalaList(gejalaRes.data);
        setSolusiList(solusiRes.data);
      } catch (err) {
        setError("Gagal memuat data gejala atau solusi.");
      }
    };
    fetchOptions();
  }, []);

  const handleAddGejala = () => {
    if (gejalaToAdd && !gejalaDipilih.find((g) => g._id === gejalaToAdd)) {
      const gejala = gejalaList.find((g) => g._id === gejalaToAdd);
      setGejalaDipilih([...gejalaDipilih, gejala]);
      setGejalaToAdd(""); // Reset dropdown
    }
  };

  const handleRemoveGejala = (idToRemove) => {
    setGejalaDipilih(gejalaDipilih.filter((g) => g._id !== idToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gejalaDipilih.length === 0 || !solusiDipilih) {
      setError("Pilih minimal satu gejala dan satu solusi.");
      return;
    }
    setIsLoading(true);
    setError("");

    const aturanData = {
      kodeAturan,
      namaAturan,
      gejala: gejalaDipilih.map((g) => g._id), // Kirim hanya array ID
      solusi: solusiDipilih,
    };

    try {
      await createAturan(aturanData);
      alert("Aturan baru berhasil dibuat!");
      navigate("/aturan"); // Kembali ke halaman manajemen aturan (jika ada)
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan aturan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Buat Aturan Baru
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Panel Info Aturan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl dark:text-gray-100 font-semibold mb-4">
            Informasi Aturan
          </h2>
          <div className="dark:text-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={kodeAturan}
              onChange={(e) => setKodeAturan(e.target.value)}
              placeholder="Kode Aturan (misal: R01)"
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

        {/* Panel Pembangun Aturan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {/* Pemilihan Gejala */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-100 font-bold mb-2">
              1. Tambahkan Kondisi "IF" (Gejala)
            </label>
            <div className="flex items-center gap-2 ">
              <select
                value={gejalaToAdd}
                onChange={(e) => setGejalaToAdd(e.target.value)}
                className="flex-grow shadow border rounded w-full py-2 px-3 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">-- Pilih gejala untuk ditambahkan --</option>
                {gejalaList.map((g) => (
                  <option key={g._id} value={g._id}>
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

          {/* Kotak "IF" */}
          <div className="min-h-[100px] border-2 border-dashed rounded-lg p-4 space-y-2 bg-gray-50 dark:bg-gray-900/50">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">
              IF (Pertanyaan yang telah di pilih):
            </h3>
            {gejalaDipilih.length > 0 ? (
              gejalaDipilih.map((g) => (
                <div
                  key={g._id}
                  className="flex items-center justify-between bg-white dark:bg-gray-700 dark:text-gray-100  p-2 rounded shadow-sm"
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

          {/* Pemilihan Solusi */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              2. Pilih Kesimpulan "THEN" (Solusi)
            </label>
            <select
              value={solusiDipilih}
              onChange={(e) => setSolusiDipilih(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 dark:text-gray-100 dark:bg-gray-800"
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

        {/* Tombol Simpan */}
        <div className="flex justify-end">
          {error && <p className="text-red-500 text-sm mr-4">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-blue-400 flex items-center gap-2"
          >
            <BrainCircuit size={18} />{" "}
            {isLoading ? "Menyimpan..." : "Simpan Aturan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuatAturanPage;
