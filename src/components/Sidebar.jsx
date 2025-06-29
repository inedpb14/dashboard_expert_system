
import React from 'react';
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Mulai Konsultasi', icon: Bot },
  { name: 'Basis Pengetahuan', icon: BookOpen },
  { name: 'Riwayat', icon: History },
  { name: 'Pengaturan', icon: Settings },
];

const Sidebar = ({ isCollapsed, toggleSidebar, activeItem, setActiveItem }) => {
  return (
    <div
      className={`relative flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out h-screen ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-16">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Pakar.AI</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 absolute -right-4 top-5"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-6 px-2 space-y-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <a
              key={item.name}
              href="#"
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
                ${isActive ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-semibold' : ''}
                ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className={`h-6 w-6 ${isCollapsed ? '' : 'mr-4'}`} />
              {!isCollapsed && <span className="flex-1">{item.name}</span>}
            </a>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
         <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
           <img
             src="https://picsum.photos/seed/user/40/40"
             alt="User Avatar"
             className="h-10 w-10 rounded-full"
           />
           {!isCollapsed && (
             <div className="ml-3">
               <p className="text-sm font-semibold text-gray-800 dark:text-white">Admin Pakar</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">admin@pakar.ai</p>
             </div>
           )}
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
