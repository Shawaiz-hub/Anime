
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userRole: null,
  login: () => Promise.resolve(false),
  logout: () => {},
  register: () => Promise.resolve(false),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Check localStorage on initial load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUserRole = localStorage.getItem("userRole");
    
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would call an API
      // For demo purposes, we're using hardcoded values
      
      // Check if admin credentials
      if (username === "Shawaiz" && password === "231980079") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
        setIsLoggedIn(true);
        setUserRole("admin");
        return true;
      } 
      // Check if regular user (any non-empty credentials for demo)
      else if (username && password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        setIsLoggedIn(true);
        setUserRole("user");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would call an API
      // For demo purposes, we'll just set the user as logged in
      if (name && email && password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userName", name);
        setIsLoggedIn(true);
        setUserRole("user");
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
