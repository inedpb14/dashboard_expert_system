
import React from 'react';
import { BookOpen, Search } from 'lucide-react';

const knowledgeBaseItems = [
  { title: 'Memahami Gaya Belajar Visual', summary: 'Ciri-ciri dan strategi belajar yang efektif untuk siswa dengan gaya belajar visual.' },
  { title: 'Panduan untuk Kecerdasan Kinestetik', summary: 'Bagaimana mengoptimalkan pembelajaran melalui gerakan dan aktivitas fisik.' },
  { title: 'Mengidentifikasi Minat dan Bakat Seni', summary: 'Tanda-tanda awal dan cara mendukung siswa dengan bakat di bidang seni.' },
  { title: 'Strategi Belajar untuk Tipe Auditori', summary: 'Tips dan trik untuk membantu siswa auditori menyerap informasi dengan lebih baik.' },
  { title: 'Kecerdasan Logis-Matematis', summary: 'Pengenalan dan cara mengasah kemampuan berpikir logis dan matematis.' },
  { title: 'Mengembangkan Kecerdasan Interpersonal', summary: 'Pentingnya kemampuan sosial dan cara melatihnya sejak dini.' }
];

const BasisPengetahuan = () => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari dalam basis pengetahuan..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {knowledgeBaseItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="flex-shrink-0">
                <BookOpen className="w-8 h-8 text-blue-500 mb-4" />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.summary}</p>
            </div>
            <div className="mt-4">
                <a href="#" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Baca Selengkapnya &rarr;</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasisPengetahuan;
