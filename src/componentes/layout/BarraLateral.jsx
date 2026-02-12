import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, Settings, Globe, 
  LogOut, ChevronDown, ChevronUp, ExternalLink,
  Sprout, Tractor, Wheat // Iconos que representan al campesino y al agro
} from 'lucide-react';

// Corregido a .png según tu captura de pantalla
import logoSena from '../../assets/logoSena.png';

const BarraLateral = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openConfig, setOpenConfig] = useState(true);

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="h-screen w-64 bg-[#052e16] text-white flex flex-col fixed left-0 top-0 overflow-y-auto z-50 shadow-2xl">
      
      {/* HEADER CON EL LOGO DEL SENA INTEGRADO */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10 mb-2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-[#39a900] shadow-sm flex-shrink-0">
          <img 
            src={logoSena} 
            alt="Logo SENA" 
            className="w-full h-full object-contain p-1" 
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight leading-none">CampeSENA</h1>
          <span className="text-[10px] text-[#39a900] font-bold uppercase mt-1 tracking-wider">ADMINISTRADOR</span>
        </div>
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
      </nav>

      {/* Footer Ajustado con Iconos de Campo */}
      <div className="p-4 border-t border-white/10 bg-[#042612] mt-auto">
        {/* Iconos Decorativos de Campo */}
        <div className="flex justify-around items-center mb-5 px-4 text-gray-300">
          <Sprout size={22} strokeWidth={1.5} />
          <Tractor size={22} strokeWidth={1.5} />
          <Wheat size={22} strokeWidth={1.5} />
        </div>

        {/* Cerrar Sesión (Tamaño Intermedio) */}
        <button 
          onClick={handleCerrarSesion} 
          className="flex items-center justify-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-900/20 rounded-xl transition-all font-bold text-sm border border-red-900/30"
        >
          <LogOut size={20}/>
          <span>Cerrar Sesión</span>
        </button>
      </div>

    </div>
  );
};

export default BarraLateral;