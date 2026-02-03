import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexto y Seguridad
import { AuthProvider } from './contexto/ContextoAutenticacion';
import IniciarSesion from './autenticacion/IniciarSesion';
import RutaProtegida from './autenticacion/RutaProtegida';

// Layout base
import ContenedorPagina from './componentes/layout/ContenedorPagina';

// Vistas de ADMINISTRADOR
import PanelAdministrador from './paginas/administrador/PanelAdministrador';
import GestionUsuarios from './paginas/administrador/GestionUsuarios';
import Solicitudes from './paginas/administrador/Solicitudes';
import RolesPermisos from './paginas/administrador/RolesPermisos';
import Auditoria from './paginas/administrador/Auditoria';
import ConfiguracionSistema from './paginas/administrador/ConfiguracionSistema';

// Vistas de CAMPESINO
import PanelCampesino from './paginas/campesino/PanelCampesino';
import NuevaSolicitud from './paginas/campesino/NuevaSolicitud';
import SeguimientoSolicitud from './paginas/campesino/SeguimientoSolicitud';

function App() {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const handleNotificacion = (event) => {
      setNotificaciones(prev => [event.detail, ...prev]);
    };
    window.addEventListener('nueva-notificacion', handleNotificacion);
    return () => window.removeEventListener('nueva-notificacion', handleNotificacion);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 1. RUTA PÚBLICA */}
          <Route path="/login" element={<IniciarSesion />} />

          {/* 2. RUTAS PRIVADAS PROTEGIDAS */}
          <Route element={<RutaProtegida />}>
            
            {/* SECCIÓN ADMINISTRADOR */}
            <Route 
              path="/admin" 
              element={<ContenedorPagina notificaciones={notificaciones} />}
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PanelAdministrador />} />
              <Route path="usuarios" element={<GestionUsuarios />} />
              <Route path="solicitudes" element={<Solicitudes />} />
              <Route path="roles-permisos" element={<RolesPermisos />} />
              <Route path="auditoria" element={<Auditoria />} />
              
              {/* RUTAS DE CONFIGURACIÓN (CORREGIDAS) */}
              <Route path="configuracion" element={<ConfiguracionSistema />} />
              <Route path="configuracion/documentos" element={<ConfiguracionSistema />} />
              <Route path="configuracion/formularios" element={<ConfiguracionSistema />} />
            </Route>

            {/* SECCIÓN CAMPESINO */}
            <Route 
              path="/campesino" 
              element={<ContenedorPagina notificaciones={notificaciones} />}
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PanelCampesino />} />
              <Route path="nueva-solicitud" element={<NuevaSolicitud />} />
              <Route path="seguimiento" element={<SeguimientoSolicitud />} />
            </Route>

          </Route>

          {/* 3. REDIRECCIONES GLOBALES */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;