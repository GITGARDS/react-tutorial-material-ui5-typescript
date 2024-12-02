import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createContext } from "vm";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData {
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCES_TOKEN = "APP_ACCES_TOKEN";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const accesToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCES_TOKEN);
      if (accesToken) {
        setAccessToken(JSON.parse(accesToken));
      } else {
        setAccessToken(undefined);
      }
    }, []);

    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY__ACCES_TOKEN,
        JSON.stringify(result.accessToken)
      );
      setAccessToken(result.accessToken);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCES_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
