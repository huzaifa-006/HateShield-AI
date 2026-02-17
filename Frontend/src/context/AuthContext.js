import { createContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoize the checkAuth function to prevent infinite re-renders
  const checkAuth = useCallback(async () => {
    try {
      console.log("Checking authentication...");
      const response = await getCurrentUser();
      console.log("Auth response:", response);
      if (response.user) {
        console.log("User authenticated:", response.user.username);
        setUser(response.user);
      } else {
        console.log("No user found in response");
        setUser(null);
      }
    } catch (error) {
      console.log("Authentication check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check authentication status on mount and when window gains focus
  useEffect(() => {
    // Check auth on mount
    checkAuth();

    // Check auth when window gains focus (user returns to tab)
    const handleFocus = () => {
      checkAuth();
    };

    // Check auth when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuth();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAuth]);

  const login = (userData) => {
    if (userData && userData.user) {
      setUser(userData.user);
    } else {
      setUser(userData);
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8000/user/logout/', {
        method: 'POST',
        credentials: 'include',
      });
      
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
