// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // renamed for clarity

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // If no token, we're done loading
    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    // Validate the token with the backend
    axios
      .get("http://localhost:4000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.success) {
          // Token is valid – update user state
          setUser(response.data.user);
          // Also sync localStorage (optional, but good)
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          // Token invalid – clear storage
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => {
        setIsAuthLoading(false); // loading finished in all cases
      });
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthLoading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};