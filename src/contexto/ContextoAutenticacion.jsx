// src/contexto/ContextoAutenticacion.jsx
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    // 1. Limpiar localStorage
    localStorage.clear();
    // 2. Limpiar estado
    setUsuario(null);
    // 3. Redirigir al login (FORZADO)
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);