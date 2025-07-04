// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Buat Interceptor Permintaan (Request Interceptor)
// Fungsi ini akan berjalan SEBELUM setiap permintaan dikirim.
API.interceptors.request.use(
  (config) => {
    // Ambil data pengguna dari localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Jika data pengguna dan token ada...
    if (userInfo && userInfo.token) {
      // ...tambahkan header 'Authorization' ke permintaan.
      // Format 'Bearer <token>' adalah standar umum.
      config.headers['Authorization'] = `Bearer ${userInfo.token}`;
    }

    // Kembalikan konfigurasi yang sudah dimodifikasi agar permintaan bisa dilanjutkan.
    return config;
  },
  (error) => {
    // Lakukan sesuatu jika terjadi error pada konfigurasi permintaan
    return Promise.reject(error);
  }
);

// ==============================================================
// Fungsi login untuk User
// ==============================================================
export const loginUser = async (credentials) => {
  const response = await API.post("/users/login", credentials);
  return response.data;
};
export const getAllSiswa = () => API.get("/users/siswa");
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const getUserById = (id) => API.get(`/users/${id}`);


// ==============================================================
// Fungsi untuk Kategori
// ==============================================================
export const getAllKategori = () => API.get("/kategori");
export const createKategori = (kategoriData) => API.post("/kategori", kategoriData);
export const getKategoriById = (id) => API.get(`/kategori/${id}`);
export const updateKategori = (id, kategoriData) =>
  API.put(`/kategori/${id}`, kategoriData);
export const deleteKategori = (id) => API.delete(`/kategori/${id}`);


// ==============================================================
// Fungsi untuk gejala
// ==============================================================
export const getAllGejala = () => API.get('/gejala');
export const createGejala = (gejalaData) => API.post('/gejala', gejalaData);
export const getGejalaById = (id) => API.get(`/gejala/${id}`);
export const updateGejala = (id, gejalaData) =>
  API.put(`/gejala/${id}`, gejalaData);
export const deleteGejala = (id) => API.delete(`/gejala/${id}`);


// ==============================================================
// FUNGSI SOLUSI 
// ==============================================================
export const getAllSolusi = () => API.get('/solusi');
export const createSolusi = (solusiData) => API.post('/solusi', solusiData);
export const getSolusiById = (id) => API.get(`/solusi/${id}`);
export const updateSolusi = (id, solusiData) =>
  API.put(`/solusi/${id}`, solusiData);
export const deleteSolusi = (id) => API.delete(`/solusi/${id}`);

// =============================================================
// FUNGSI UNTUK ATURAN / RULES
// ==============================================================
export const getAllAturan = () => API.get('/aturan');
export const createAturan = (aturanData) => API.post('/aturan', aturanData);
export const getAturanById = (id) => API.get(`/aturan/${id}`);
export const updateAturan = (id, aturanData) => API.put(`/aturan/${id}`, aturanData);
export const deleteAturan = (id) => API.delete(`/aturan/${id}`);

// ==============================================================
// Fungsi untuk Kelas
// ==============================================================
export const getAllKelas = () => API.get('/kelas');
export const createKelas = (kelasData) => API.post('/kelas', kelasData);
export const getKelasById = (id) => API.get(`/kelas/${id}`);
export const updateKelas = (id, kelasData) => API.put(`/kelas/${id}`, kelasData);
export const deleteKelas = (id) => API.delete(`/kelas/${id}`);

// ==============================================================
// Fungsi untuk Manajemen Riwayat oleh Admin
// ==============================================================
export const getAllRiwayat = () => API.get('/konsultasi/admin/semua', );
export const getDetailRiwayat = (id) => API.get(`/konsultasi/${id}`);
export const deleteRiwayatById = (id) => API.delete(`/konsultasi/${id}`);

// ==============================================================
export default API;
