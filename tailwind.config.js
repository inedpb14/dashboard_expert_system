// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // PASTIKAN BAGIAN 'content' TERLIHAT SEPERTI INI
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- BARIS INI PALING PENTING
  ],

  // Pastikan darkMode juga sudah di-set ke 'class'
  darkMode: "class",

  theme: {
    extend: {},
  },
  plugins: [],
};
