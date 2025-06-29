
import React, { useMemo } from 'react';
import StatCard from './StatCard';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Zap, Users, Activity } from 'lucide-react';

// Dummy Data
const statCardsData = [
  { icon: Activity, title: 'Total Konsultasi', value: '1,204', change: '+12.5%', isPositive: true },
  { icon: Zap, title: 'Diagnosis Tepat', value: '95.8%', change: '+2.1%', isPositive: true },
  { icon: Users, title: 'Pengguna Aktif', value: '312', change: '-1.8%', isPositive: false },
  { icon: DollarSign, title: 'Pengetahuan Baru', value: '87', change: '+5', isPositive: true },
];

const barChartData = [
  { name: 'Kinestetik', value: 400 },
  { name: 'Visual', value: 300 },
  { name: 'Auditori', value: 200 },
  { name: 'Logis', value: 278 },
  { name: 'Interpersonal', value: 189 },
  { name: 'Intrapersonal', value: 239 },
];

const pieChartData = [
  { name: 'Sains', value: 400 },
  { name: 'Seni', value: 300 },
  { name: 'Olahraga', value: 300 },
  { name: 'Bahasa', value: 200 },
];

const historyData = [
  { id: 'C001', studentName: 'Budi Hartono', date: '2024-07-21', diagnosis: 'Kecenderungan Visual', accuracy: 98 },
  { id: 'C002', studentName: 'Citra Lestari', date: '2024-07-21', diagnosis: 'Minat pada Seni', accuracy: 92 },
  { id: 'C003', studentName: 'Doni Saputra', date: '2024-07-20', diagnosis: 'Dominan Kinestetik', accuracy: 95 },
  { id: 'C004', studentName: 'Eka Wijaya', date: '2024-07-20', diagnosis: 'Bakat Logis-Matematis', accuracy: 99 },
  { id: 'C005', studentName: 'Fitriani', date: '2024-07-19', diagnosis: 'Kecerdasan Interpersonal', accuracy: 94 },
];

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = ({ theme }) => {
   const chartTheme = useMemo(() => ({
    tickColor: theme === 'dark' ? '#9ca3af' : '#6b7280',
    gridColor: theme === 'dark' ? '#374151' : '#e5e7eb',
    legendColor: theme === 'dark' ? '#d1d5db' : '#374151',
  }), [theme]);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCardsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Analisis Karakteristik Siswa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridColor} />
              <XAxis dataKey="name" tick={{ fill: chartTheme.tickColor }} fontSize={12} />
              <YAxis tick={{ fill: chartTheme.tickColor }} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                }}
              />
              <Legend wrapperStyle={{ color: chartTheme.legendColor }}/>
              <Bar dataKey="value" fill="#3b82f6" name="Jumlah Siswa" barSize={30} radius={[4, 4, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Distribusi Rekomendasi</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {pieChartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
               <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                }}
              />
              <Legend wrapperStyle={{ color: chartTheme.legendColor }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Riwayat Konsultasi Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID Konsultasi</th>
                <th scope="col" className="px-6 py-3">Nama Siswa</th>
                <th scope="col" className="px-6 py-3">Tanggal</th>
                <th scope="col" className="px-6 py-3">Hasil Diagnosis</th>
                <th scope="col" className="px-6 py-3">Akurasi</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item) => (
                <tr key={item.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                  <td className="px-6 py-4">{item.studentName}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">{item.diagnosis}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-2">{item.accuracy}%</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.accuracy}%` }}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
