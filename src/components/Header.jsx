
import React from 'react';
import { Sun, Moon, Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for theme management

const Header = ({ activeItem }) => {
  const { theme, toggleTheme } = useAuth(); 
  console.log("ini theme dari header:", theme);
  return (
    <header className="sticky top-0 z-0 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Pages / {activeItem}</p>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{activeItem}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari..."
              className="pl-10 pr-4 py-2 w-60 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Bell size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
