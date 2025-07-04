// src/components/Sidebar.jsx

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BrainCircuit,
  Grid2x2Plus,
  LogOut,
  ListTodo,
  Star,
  Braces,
} from "lucide-react";

// Struktur data tidak perlu diubah, sudah bagus.
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Mulai Konsultasi", icon: Bot, path: "/konsultasi" },
  { name: "Manajemen User", 
    icon: Bot,
    subItems: [
      { name: "Siswa", icon: Bot, path: "/siswa" },
      { name: "Kelas", icon: Bot, path: "/kelas" },
  ]
  },
  {
    name: "Basis Pengetahuan",
    icon: BookOpen,
    subItems: [
      { name: "Kategori", icon: Grid2x2Plus, path: "/kategori" },
      { name: "Gejala", icon: ListTodo, path: "/gejala" },
      { name: "Solusi", icon: Star, path: "/solusi" },
      { name: "Aturan", icon: Braces , path: "/aturan"},
    ],
  },
  { name: "Riwayat", icon: History, path: "/riwayat" },
  { name: "Pengaturan", icon: Settings, path: "/pengaturan" },
];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // BEST PRACTICE: Tambahkan useEffect untuk menutup dropdown saat sidebar diciutkan.
  useEffect(() => {
    if (isCollapsed) {
      setDropdownOpen(false);
    }
  }, [isCollapsed]);

  return (
    <div
      className={`relative flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out h-screen ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header Sidebar (tidak berubah) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-16">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Pakar.AI
            </span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 absolute z-10 -right-4 top-5"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-6 overflow-y-auto scrollbar-sidebar px-2 space-y-2">
        {navItems.map((item) =>
          item.subItems ? (
            <div key={item.name}>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <item.icon
                  className={`h-6 w-6 shrink-0 ${isCollapsed ? "" : "mr-4"}`}
                />
                {!isCollapsed && (
                  <span className="flex-1 text-left">{item.name}</span>
                )}
                {!isCollapsed && (
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {/* PERBAIKAN: Transisi untuk dropdown */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  !isCollapsed && isDropdownOpen ? "max-h-520" : "max-h-0"
                }`}
              >
                <div className="mt-2 pl-8 space-y-2">
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-semibold"
                            : ""
                        }`
                      }
                    >
                      <subItem.icon className="h-5 w-5 mr-3 shrink-0" />
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              title={isCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-semibold"
                    : ""
                } ${isCollapsed ? "justify-center" : ""}`
              }
            >
              <item.icon
                className={`h-6 w-6 shrink-0 ${isCollapsed ? "" : "mr-4"}`}
              />
              {!isCollapsed && <span className="flex-1">{item.name}</span>}
            </NavLink>
          )
        )}
      </nav>

      {/* REFAKTOR: Menyederhanakan Tombol Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className={`w-full flex items-center gap-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && "Logout"}
        </button>
      </div>

      {/* Bagian Profil User */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
        >
          <img
            src="https://i.pravatar.cc/40?u=admin"
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
          />
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                Admin Pakar
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                admin@pakar.ai
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
