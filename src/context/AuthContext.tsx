import React, { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/auth";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userEmail: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  userEmail: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // عند بدء التشغيل، يمكننا استرجاع بيانات المستخدم من التوكن أو API (اختياري)
    const token = getToken();
    if (token) {
      // فك JWT لاستخلاص البريد لو أردت
      // هنا نبقي البريد null وسنكمله لاحقاً
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    setToken(data.token);
    setUserEmail(data.user.email);
    navigate("/admin", { replace: true });
  };

  const logout = () => {
    removeToken();
    setUserEmail(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
