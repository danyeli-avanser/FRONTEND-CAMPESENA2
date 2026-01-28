import { NavLink, useNavigate } from 'react-router-dom'; // 1. Agregamos useNavigate
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Globe, 
  BarChart3, 
  LogOut 
} from 'lucide-react';

const BarraLateral = () => {
  const navigate = useNavigate(); // 2. Inicializamos el navegador

  // Función para cerrar sesión sin complicaciones
  const handleCerrarSesion = () => {
    localStorage.clear(); // Limpiamos el token/datos
    navigate('/login', { replace: true }); // Mandamos al login de una
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, path: '/admin/dashboard' },
    { name: 'Solicitudes', icon: <FileText size={20}/>, path: '/admin/solicitudes' },
    { name: 'Usuarios', icon: <Users size={20}/>, path: '/admin/usuarios' },
    { name: 'Configuración', icon: <Settings size={20}/>, path: '/admin/configuracion' },
    { name: 'Portal', icon: <Globe size={20}/>, path: '/admin/portal' },
    { name: 'Reportes', icon: <BarChart3 size={20}/>, path: '/admin/reportes' },
  ];

  return (
    <div className="h-screen w-64 bg-[#052e16] text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
          <span className="text-[#052e16] font-bold">S</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight">CampeSENA</h1>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-[#39a900] text-white' : 'hover:bg-[#1a3d21] text-gray-300'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1a3d21]">
        <div className="flex items-center gap-3 mb-4 px-4">
          <div className="w-10 h-10 bg-[#39a900] rounded-full flex items-center justify-center">AD</div>
          <div className="text-sm">
            <p className="font-bold">Admin SENA</p>
            <p className="text-xs text-gray-400">Administrador</p>
          </div>
        </div>
        {/* 3. Agregamos el onClick aquí */}
        <button 
          onClick={handleCerrarSesion}
          className="flex items-center gap-3 px-4 py-2 w-full text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut size={20}/>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default BarraLateral;