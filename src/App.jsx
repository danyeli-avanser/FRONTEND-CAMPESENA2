// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BarraLateral from './componentes/layout/BarraLateral';
import PanelAdministrador from './paginas/administrador/PanelAdministrador';
import GestionUsuarios from './paginas/administrador/GestionUsuarios';
import IniciarSesion from './autenticacion/IniciarSesion';
import RutaProtegida from './autenticacion/RutaProtegida';
import { AuthProvider } from './contexto/ContextoAutenticacion';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 1. RUTA PÚBLICA: El login se muestra solito en toda la pantalla */}
          <Route path="/login" element={<IniciarSesion />} />

          {/* 2. RUTAS PRIVADAS: Solo accesibles si hay token */}
          <Route element={<RutaProtegida />}>
            <Route
              path="/admin/*"
              element={
                <div className="flex min-h-screen bg-gray-50">
                  {/* Aquí la BarraLateral aparece solo en el panel admin */}
                  <BarraLateral />
                  <main className="flex-1 ml-64 p-8">
                    <Routes>
                      <Route path="dashboard" element={<PanelAdministrador />} />
                      <Route path="usuarios" element={<GestionUsuarios />} />
                      {/* Aquí puedes meter Reportes, Configuración, etc. */}
                      <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                  </main>
                </div>
              }
            />
          </Route>

          {/* 3. REDIRECCIÓN POR DEFECTO: Si no sabe a donde ir, al dashboard */}
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;