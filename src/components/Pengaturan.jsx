
import React from 'react';
import { User, Bell } from 'lucide-react';

const Pengaturan = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
            <User className="w-8 h-8 text-blue-500" />
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">Profil Saya</h3>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
              <input id="fullName" type="text" defaultValue="Admin Pakar" className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Email</label>
              <input id="email" type="email" defaultValue="admin@pakar.ai" className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
            </div>
          </div>
          <div className="pt-2">
              <button type="submit" className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">Simpan Perubahan</button>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
         <div className="flex items-center gap-4 mb-6">
            <Bell className="w-8 h-8 text-blue-500" />
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100">Notifikasi</h3>
        </div>
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Notifikasi Email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Terima ringkasan konsultasi melalui email.</p>
                </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </div>
             <div className="border-t border-gray-200 dark:border-gray-700"></div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">Notifikasi Push</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dapatkan notifikasi real-time di perangkat Anda.</p>
                </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;
