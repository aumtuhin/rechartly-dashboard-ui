
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const defaultUser: User = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Data Analyst"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Check if user is authenticated on load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsAuthenticated(true);
      
      // Load user data from localStorage or use default
      const savedUser = localStorage.getItem("userData");
      setUser(savedUser ? JSON.parse(savedUser) : defaultUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Mock login - in a real app, validate credentials with API
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true);
      
      // Save default user data
      setUser(defaultUser);
      localStorage.setItem("userData", JSON.stringify(defaultUser));
      
      return Promise.resolve();
    }
    return Promise.reject("Invalid credentials");
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };
  
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
