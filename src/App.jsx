import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import MulaiKonsultasi from "./components/MulaiKonsultasi";
import BasisPengetahuan from "./components/BasisPengetahuan";
import Riwayat from "./components/Riwayat";
import Pengaturan from "./components/Pengaturan";

const App = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth < 768
  );
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        return storedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard theme={theme} />;
      case "Mulai Konsultasi":
        return <MulaiKonsultasi />;
      case "Basis Pengetahuan":
        return <BasisPengetahuan />;
      case "Riwayat":
        return <Riwayat />;
      case "Pengaturan":
        return <Pengaturan />;
      default:
        return <Dashboard theme={theme} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeItem={activeItem}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
