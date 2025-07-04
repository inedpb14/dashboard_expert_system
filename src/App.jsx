// src/App.jsx

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";

function App() { 
  const { theme, toggleTheme } = useAuth();

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth < 768
  );
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  useEffect(() => {
    const handleResize = () => setSidebarCollapsed(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Kita teruskan semua yang dibutuhkan Header */}
        <Header
          toggleSidebar={toggleSidebar}
          theme={theme}
          toggleTheme={toggleTheme}
    
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
