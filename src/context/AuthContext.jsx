// src/context/AuthContext.jsx

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
// import { useNavigate } from "react-router-dom"; // <-- BARIS INI DIHAPUS karena tidak digunakan lagi

import { loginUser as loginApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  // ==========================================
  const [theme, setTheme] = useState(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.error("Gagal memuat userInfo dari local storage:", error);
      localStorage.removeItem("userInfo");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const data = await loginApi(credentials);
      const userData = {
        id: data._id,
        username: data.username,
        role: data.role,
        token: data.token,
      };
      setUserInfo(userData);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    user: userInfo,
    token: userInfo?.token,
    isLoading,
    login,
    logout,
    theme,
    toggleTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
