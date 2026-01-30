import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IniciarSesion from './autenticacion/IniciarSesion';
import RutaProtegida from './autenticacion/RutaProtegida';
import { AuthProvider } from './contexto/ContextoAutenticacion';
import Solicitudes from './paginas/administrador/Solicitudes';

// Layout base
import ContenedorPagina from './componentes/layout/ContenedorPagina';

// Vistas de ADMINISTRADOR (Rutas según tu carpeta)
import PanelAdministrador from './paginas/administrador/PanelAdministrador';
import GestionUsuarios from './paginas/administrador/GestionUsuarios';
import ConfiguracionSistema from './paginas/administrador/ConfiguracionSistema';

// Vistas de CAMPESINO (Rutas según tu carpeta)
import PanelCampesino from './paginas/campesino/PanelCampesino';
import NuevaSolicitud from './paginas/campesino/NuevaSolicitud'; // Nombre exacto de tu archivo
import SeguimientoSolicitud from './paginas/campesino/SeguimientoSolicitud'; // Nombre exacto de tu archivo

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 1. RUTA PÚBLICA */}
          <Route path="/login" element={<IniciarSesion />} />

          {/* 2. RUTAS PRIVADAS (Envueltas en el sistema de seguridad) */}
          <Route element={<RutaProtegida />}>
            
            {/* SECCIÓN ADMINISTRADOR */}
            <Route path="/admin" element={<ContenedorPagina />}>
              <Route path="dashboard" element={<PanelAdministrador />} />
              <Route path="usuarios" element={<GestionUsuarios />} />
              <Route path="configuracion" element={<ConfiguracionSistema />} />
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="solicitudes" element={<Solicitudes />} />
            </Route>

            {/* SECCIÓN CAMPESINO */}
            <Route path="/campesino" element={<ContenedorPagina />}>
              <Route path="dashboard" element={<PanelCampesino />} />
              <Route path="nueva-solicitud" element={<NuevaSolicitud />} />
              <Route path="seguimiento" element={<SeguimientoSolicitud />} />
              <Route index element={<Navigate to="dashboard" replace />} />
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