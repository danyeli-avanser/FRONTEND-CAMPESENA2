import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, Settings, Globe, 
  LogOut, ChevronDown, ChevronUp
} from 'lucide-react';

const BarraLateral = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openConfig, setOpenConfig] = useState(true); // Se mantiene abierto por defecto

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="h-screen w-64 bg-[#052e16] text-white flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
          <span className="text-[#052e16] font-bold text-xl italic">S</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight">CampeSENA</h1>
      </div>

      <nav className="flex-1 px-4 mt-2 space-y-1">
        <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#39a900] text-white' : 'hover:bg-[#1a3d21] text-gray-300'}`}>
          <LayoutDashboard size={20}/>
          <span className="font-medium text-sm">Dashboard</span>
        </NavLink>

        <NavLink to="/admin/solicitudes" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#39a900] text-white' : 'hover:bg-[#1a3d21] text-gray-300'}`}>
          <FileText size={20}/>
          <span className="font-medium text-sm">Solicitudes</span>
        </NavLink>

        {/* USUARIOS DESPLEGABLE */}
        <div>
          <button onClick={() => setOpenUsuarios(!openUsuarios)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#1a3d21] text-gray-300 transition-colors">
            <div className="flex items-center gap-3"><Users size={20}/><span className="font-medium text-sm">Usuarios</span></div>
            {openUsuarios ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
          {openUsuarios && (
            <div className="ml-6 mt-1 space-y-1 border-l border-white/10">
              <NavLink to="/admin/usuarios" className={({ isActive }) => `block px-6 py-2 text-xs ${isActive ? 'text-[#39a900] font-bold' : 'text-gray-400 hover:text-white'}`}>Listado de Usuarios</NavLink>
              <NavLink to="/admin/roles-permisos" className={({ isActive }) => `block px-6 py-2 text-xs ${isActive ? 'text-[#39a900] font-bold' : 'text-gray-400 hover:text-white'}`}>Roles y Permisos</NavLink>
              <NavLink to="/admin/auditoria" className={({ isActive }) => `block px-6 py-2 text-xs ${isActive ? 'text-[#39a900] font-bold' : 'text-gray-400 hover:text-white'}`}>Auditoría</NavLink>
            </div>
          )}
        </div>

        {/* CONFIGURACIÓN DESPLEGABLE */}
        <div>
          <button 
            onClick={() => setOpenConfig(!openConfig)} 
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isActive('/configuracion') ? 'bg-[#39a900] text-white' : 'hover:bg-[#1a3d21] text-gray-300'}`}
          >
            <div className="flex items-center gap-3"><Settings size={20}/><span className="font-medium text-sm">Configuración</span></div>
            {openConfig ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
          {openConfig && (
            <div className="ml-6 mt-1 space-y-1 border-l border-white/10 animate-in slide-in-from-top-2">
              <NavLink to="/admin/configuracion/documentos" className={({ isActive }) => `block px-6 py-2 text-xs ${isActive ? 'text-[#39a900] font-black' : 'text-gray-400 hover:text-white'}`}>
                Documentos Obligatorios
              </NavLink>
              <NavLink to="/admin/configuracion/formularios" className={({ isActive }) => `block px-6 py-2 text-xs ${isActive ? 'text-[#39a900] font-black' : 'text-gray-400 hover:text-white'}`}>
                Formularios Dinámicos
              </NavLink>
            </div>
          )}
        </div>

        {/* PORTAL */}
        <NavLink to="/admin/portal" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#39a900] text-white' : 'hover:bg-[#1a3d21] text-gray-300'}`}>
          <Globe size={20}/><span className="font-medium text-sm">Portal</span>
        </NavLink>
      </nav>

      {/* Footer Perfil */}
      <div className="p-4 border-t border-[#1a3d21] bg-[#042612]">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 bg-[#39a900] rounded-full flex items-center justify-center font-bold text-white shadow-md">AD</div>
          <div className="text-sm">
            <p className="font-bold text-[13px]">Admin SENA</p>
            <p className="text-[10px] text-gray-400 uppercase font-black">Sede Central</p>
          </div>
        </div>
        <button onClick={handleCerrarSesion} className="flex items-center gap-3 px-4 py-2.5 w-full text-red-400 hover:bg-red-900/20 rounded-xl transition-all font-bold text-xs">
          <LogOut size={18}/><span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default BarraLateral;