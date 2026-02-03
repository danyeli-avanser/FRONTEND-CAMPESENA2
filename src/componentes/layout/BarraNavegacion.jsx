import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BarraNavegacion = ({ notificaciones = [] }) => {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);

  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* 1. BUSCADOR GLOBAL */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
        <input 
          type="text" 
          placeholder="Buscar trámites, usuarios o reportes..." 
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#39a900]/10 transition-all"
        />
      </div>

      {/* 2. ACCIONES (NOTIFICACIONES Y PERFIL) */}
      <div className="flex items-center gap-4">
        
        {/* CAMPANA DE NOTIFICACIONES */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotif(!showNotif); setShowPerfil(false); }}
            className={`p-2.5 rounded-xl transition-all relative ${showNotif ? 'bg-green-50 text-[#39a900]' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
          >
            <Bell size={20} />
            {notificaciones.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {notificaciones.length}
              </span>
            )}
          </button>

          {/* MENÚ DESPLEGABLE DE NOTIFICACIONES */}
          {showNotif && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Centro de Avisos</h3>
                <button onClick={() => setShowNotif(false)}><X size={14} className="text-gray-400"/></button>
              </div>
              
              <div className="max-h-[350px] overflow-y-auto">
                {notificaciones.length > 0 ? (
                  notificaciones.map((n) => (
                    <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3">
                      <div className={`p-2 rounded-lg h-fit ${n.tipo === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-[#39a900]'}`}>
                        {n.tipo === 'error' ? <AlertCircle size={16}/> : <CheckCircle2 size={16}/>}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-700">{n.texto}</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase mt-1">{n.hora}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <Bell size={32} className="mx-auto text-gray-200 mb-2" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Sin notificaciones pendientes</p>
                  </div>
                )}
              </div>
              <button className="w-full py-3 text-[10px] font-black text-[#39a900] uppercase hover:bg-green-50 transition-colors">Ver todo el historial</button>
            </div>
          )}
        </div>

        {/* PERFIL DE USUARIO */}
        <div className="relative">
          <button 
            onClick={() => { setShowPerfil(!showPerfil); setShowNotif(false); }}
            className="flex items-center gap-3 p-1.5 pr-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all"
          >
            <div className="w-9 h-9 bg-[#042b18] text-white rounded-xl flex items-center justify-center font-black text-xs shadow-sm">
              AD
            </div>
            <div className="text-left hidden md:block">
              <p className="text-[11px] font-black text-gray-800 leading-none">Admin SENA</p>
              <p className="text-[9px] font-bold text-[#39a900] uppercase">En línea</p>
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${showPerfil ? 'rotate-180' : ''}`} />
          </button>

          {/* MENÚ DESPLEGABLE DE PERFIL */}
          {showPerfil && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-2">
                <button onClick={() => navigate('/admin/configuracion')} className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <User size={16} className="text-gray-400" /> Mi Perfil
                </button>
                <button onClick={() => navigate('/admin/configuracion')} className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <Settings size={16} className="text-gray-400" /> Ajustes
                </button>
                <div className="h-px bg-gray-100 my-2 mx-2"></div>
                <button 
                  onClick={handleCerrarSesion}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default BarraNavegacion;