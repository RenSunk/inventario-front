import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookieToken = Cookies.get(btoa("token"));
    if (cookieToken) {
      setToken(atob(cookieToken));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);