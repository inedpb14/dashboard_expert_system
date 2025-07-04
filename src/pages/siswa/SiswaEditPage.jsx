// src/pages/SiswaEditPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser, getAllKelas } from "../../services/api";
import { Save, XCircle } from "lucide-react";

const SiswaEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kelasList, setKelasList] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    kelasId: "",
    biografi: "",
    password: "", // Untuk reset password
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siswaRes, kelasRes] = await Promise.all([
          getUserById(id),
          getAllKelas(),
        ]);

        const siswaData = siswaRes.data;
        setFormData({
          username: siswaData.username,
          kelasId: siswaData.kelas?._id || "",
          biografi: siswaData.biografi || "",
          password: "", // Selalu kosongkan field password di awal
        });
        setKelasList(kelasRes.data);
      } catch (err) {
        setError("Gagal memuat data siswa.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Siapkan data untuk dikirim, hapus password jika kosong
    const dataToUpdate = { ...formData };
    if (!dataToUpdate.password) {
      delete dataToUpdate.password;
    }

    try {
      await updateUser(id, dataToUpdate);
      alert("Data siswa berhasil diperbarui!");
      navigate("/siswa");
    } catch (err) {
      setError("Gagal memperbarui data siswa.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center p-10">Memuat data...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Edit Siswa: {formData.username}
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-bold mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
              readOnly
              disabled
            />
          </div>

          <div>
            <label htmlFor="kelasId" className="block text-sm font-bold mb-2">
              Kelas
            </label>
            <select
              id="kelasId"
              name="kelasId"
              value={formData.kelasId}
              onChange={handleInputChange}
              className="shadow border rounded w-full py-2 px-3"
            >
              <option value="">-- Belum Ditetapkan --</option>
              {kelasList.map((k) => (
                <option key={k._id} value={k._id}>
                  {k.namaKelas}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="biografi" className="block text-sm font-bold mb-2">
              Biografi Singkat
            </label>
            <textarea
              id="biografi"
              name="biografi"
              value={formData.biografi}
              onChange={handleInputChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3"
            ></textarea>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Reset Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Kosongkan jika tidak ingin diubah"
              className="shadow appearance-none border rounded w-full py-2 px-3"
            />
          </div>

          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-end gap-4 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate("/siswa")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <XCircle size={18} /> Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <Save size={18} />{" "}
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiswaEditPage;
