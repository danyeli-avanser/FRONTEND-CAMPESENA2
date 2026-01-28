// src/navegacion/EnrutadorPrincipal.jsx (fragmento)
import { Routes, Route } from 'react-router-dom';
import IniciarSesion from '../autenticacion/IniciarSesion';
import CerrarSesion from '../autenticacion/CerrarSesion';
// ... otros imports

const EnrutadorPrincipal = () => {
  return (
    <Routes>
      <Route path="/login" element={<IniciarSesion />} />
      <Route path="/logout" element={<CerrarSesion />} />
    </Routes>
  );
};