import { createContext, useContext, useMemo, useState } from "react";
import projectService from "../lib/projectService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("token"));
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setError(null);
    try {
      const res = await projectService.login(credentials);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setIsAdmin(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      setError("Login failed: Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  const value = useMemo(
    () => ({
      isAdmin,
      error,
      login,
      logout,
    }),
    [isAdmin, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
