import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios.ts";

const AuthContext = createContext('' as any);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email:any, password:any) => {
    const res = await api.post("/auth/login", { email, password });
    const _user = res.data;
    localStorage.setItem("token", _user.token);
    localStorage.setItem("user", JSON.stringify(_user));
    setUser(_user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
