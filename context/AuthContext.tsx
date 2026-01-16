import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  sessionExpired: boolean;
  setSessionExpired: (expired: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  sessionExpired: false,
  setSessionExpired: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      const cookieToken = Cookies.get(btoa("token"));
      return cookieToken ? atob(cookieToken) : null;
    } catch (e) {
      return null;
    }
  });
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    try {
      const cookieToken = Cookies.get(btoa("token"));
      if (cookieToken && !token) {
        setToken(atob(cookieToken));
      }
    } catch (e) {
      // ignore (e.g., server-side or cookie read error)
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      Cookies.set(btoa("token"), btoa(token), { expires: 1 });
    } else {
      Cookies.remove(btoa("token"));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, sessionExpired, setSessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);