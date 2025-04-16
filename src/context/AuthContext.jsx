import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      // Get both user and token from localStorage
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      // Only restore if both exist
      if (savedUser && savedToken) {
        return {
          loggedInUser: JSON.parse(savedUser),
          token: savedToken,
        };
      }
      return null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Update localStorage when user state changes
  useEffect(() => {
    try {
      if (user && user.loggedInUser && user.token) {
        localStorage.setItem("user", JSON.stringify(user.loggedInUser));
        localStorage.setItem("token", user.token);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [user]);

  const login = async (data) => {
    setIsLoading(true);
    try {
      // Ensure data has the expected structure
      if (!data.loggedInUser || !data.token) {
        throw new Error("Invalid login data structure");
      }
      setUser(data);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user?.loggedInUser || null,
        token: user?.token || null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
