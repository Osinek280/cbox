import { refreshTokenAPI } from "@/api/auth";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setAccessToken(storedToken);
  }, []);

  const login = (newAccessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAccessToken(newAccessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
  };

  const refreshAccessToken = async () => {
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) throw new Error("Brak refresh tokena");
      const newAccessToken = await refreshTokenAPI(token);
      localStorage.setItem("accessToken", newAccessToken);
      setAccessToken(newAccessToken);
    } catch (err) {
      console.error("Refresh token failed", err);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn: !!accessToken,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth musi być użyty wewnątrz AuthProvider");
  return context;
};
