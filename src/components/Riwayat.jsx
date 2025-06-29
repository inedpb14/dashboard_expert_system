
import React from 'react';

const fullHistoryData = [
    { id: 'C001', studentName: 'Budi Hartono', date: '2024-07-21', diagnosis: 'Kecenderungan Visual', accuracy: 98 },
    { id: 'C002', studentName: 'Citra Lestari', date: '2024-07-21', diagnosis: 'Minat pada Seni', accuracy: 92 },
    { id: 'C003', studentName: 'Doni Saputra', date: '2024-07-20', diagnosis: 'Dominan Kinestetik', accuracy: 95 },
    { id: 'C004', studentName: 'Eka Wijaya', date: '2024-07-20', diagnosis: 'Bakat Logis-Matematis', accuracy: 99 },
    { id: 'C005', studentName: 'Fitriani', date: '2024-07-19', diagnosis: 'Kecerdasan Interpersonal', accuracy: 94 },
    { id: 'C006', studentName: 'Gita Amelia', date: '2024-07-19', diagnosis: 'Kecenderungan Visual', accuracy: 96 },
    { id: 'C007', studentName: 'Hadi Prasetyo', date: '2024-07-18', diagnosis: 'Bakat Bahasa', accuracy: 91 },
    { id: 'C008', studentName: 'Indah Permata', date: '2024-07-18', diagnosis: 'Minat pada Olahraga', accuracy: 97 },
];

const Riwayat = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-100">Semua Riwayat Konsultasi</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg">ID Konsultasi</th>
                            <th scope="col" className="px-6 py-3">Nama Siswa</th>
                            <th scope="col" className="px-6 py-3">Tanggal</th>
                            <th scope="col" className="px-6 py-3">Hasil Diagnosis</th>
                            <th scope="col" className="px-6 py-3">Akurasi</th>
                            <th scope="col" className="px-6 py-3 rounded-r-lg text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fullHistoryData.map((item, index) => (
                            <tr key={item.id} className={`bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 ${index === fullHistoryData.length - 1 ? '' : 'border-b dark:border-gray-700'}`}>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                                <td className="px-6 py-4">{item.studentName}</td>
                                <td className="px-6 py-4">{item.date}</td>
                                <td className="px-6 py-4">{item.diagnosis}</td>
                                <td className="px-6 py-4">{item.accuracy}%</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Lihat Detail</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Riwayat;
