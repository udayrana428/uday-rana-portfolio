import { createContext, useContext, useState, useEffect } from "react";
import * as API from "../api/index";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [accessToken, setAccessToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // Update localStorage when user state changes
  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await API.refreshTokenAPI();
        console.log("response", response);
        if (response.data.success) {
          await API.setAccessToken(response.data?.data?.accessToken);
          setAccessToken(response.data?.data?.accessToken);

          const userResponse = await API.currentUserAPI();
          setUser(userResponse.data.data);
          localStorage.setItem("user", JSON.stringify(userResponse.data.data));
        }
      } catch (error) {
        console.log("No valid refresh token or expired session.");
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (data) => {
    setIsLoading(true);
    try {
      // Ensure data has the expected structure
      const response = await API.loginUserAPI(data).then((res) => res.data);
      if (!response.success) {
        throw new Error(
          response.data.message || "Login failed. Please try again."
        );
      }

      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      API.setAccessToken(response.data.accessToken);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Optionally call backend to clear refresh cookie
      await API.logoutUserAPI({ withCredentials: true });
    } catch (error) {
      console.warn("Logout API failed, proceeding with local cleanup:", error);
    } finally {
      // Always clear local state, even if API fails due to expired JWT
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("user");
      API.setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
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

// ✅ Access tokens → sent in memory
// ✅ Refresh tokens → sent in HTTP-only cookies
// ✅ Refresh requests must NOT go through global interceptors
// ✅ Dedicated axios instance for refresh
// ✅ Auto 401 → refresh → replay request
// ✅ If refresh fails → logout + redirect
