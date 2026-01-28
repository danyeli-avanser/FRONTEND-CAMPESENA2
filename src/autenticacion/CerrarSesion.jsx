import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eliminarToken } from '../servicios/almacenamiento.service';

const CerrarSesion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Ejecutamos la limpieza
    eliminarToken();
    
    // 2. Redirigimos al login inmediatamente
    navigate('/login', { replace: true });
  }, [navigate]);

  return null; // No necesita renderizar nada visual
};

export default CerrarSesion;