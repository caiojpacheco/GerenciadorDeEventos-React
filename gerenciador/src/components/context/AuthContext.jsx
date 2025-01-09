import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// acesso ao context
export const useAut = () => useContext(AuthContext);

// Provider de autenticação
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name: name }); // verifica o login
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
