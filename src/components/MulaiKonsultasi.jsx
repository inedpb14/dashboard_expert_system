
import React from 'react';
import { Bot } from 'lucide-react';

const MulaiKonsultasi = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
      <div className="bg-blue-100 dark:bg-blue-900/50 p-6 rounded-full mb-6 animate-pulse">
        <Bot className="w-24 h-24 text-blue-500 dark:text-blue-400" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Mulai Sesi Konsultasi Baru</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
        Sistem pakar kami siap membantu Anda menganalisis karakteristik dan kebutuhan belajar. Jawab beberapa pertanyaan untuk mendapatkan rekomendasi yang dipersonalisasi.
      </p>
      <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        Mulai Sekarang
      </button>
    </div>
  );
};

export default MulaiKonsultasi;
