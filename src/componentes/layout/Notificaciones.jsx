import React, { useState, useEffect, useRef } from 'react';
import { Bell, UserX, UserCheck, X, Info, UserPlus } from 'lucide-react';

const Notificaciones = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lista, setLista] = useState([]);
  const menuRef = useRef(null); 

  useEffect(() => {
    const manejarNuevaNotificacion = (e) => {
      setLista(prev => [e.detail, ...prev]);
    };

    window.addEventListener('nueva-notificacion', manejarNuevaNotificacion);
    return () => window.removeEventListener('nueva-notificacion', manejarNuevaNotificacion);
  }, []);

  useEffect(() => {
    const cerrarMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', cerrarMenu);
    }
    return () => document.removeEventListener('mousedown', cerrarMenu);
  }, [isOpen]);

  const eliminarNotificacion = (id, e) => {
    e.stopPropagation();
    setLista(lista.filter(n => n.id !== id));
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón de la campanita */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`p-2 transition-colors relative ${isOpen ? 'text-[#39a900]' : 'text-gray-400 hover:text-[#39a900]'}`}
      >
        <Bell size={24} />
        {lista.length > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-white animate-pulse">
            {lista.length}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="bg-[#042b18] p-4 text-white font-bold text-xs uppercase flex justify-between items-center">
            <span>Notificaciones</span>
            {lista.length > 0 && (
              <button onClick={() => setLista([])} className="text-[#39a900] hover:text-white text-[9px] font-black transition-colors">
                Limpiar Todo
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {lista.length === 0 ? (
              <div className="p-10 text-center space-y-2">
                <Bell size={32} className="mx-auto text-gray-100" />
                <p className="text-gray-400 text-xs font-medium">No hay novedades por ahora</p>
              </div>
            ) : (
              lista.map((n) => (
                <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 flex justify-between items-start transition-colors">
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-xl ${
                      n.tipo === 'desactivar' ? 'bg-red-50 text-red-500' : 
                      n.tipo === 'registro' ? 'bg-green-50 text-[#39a900]' : 'bg-blue-50 text-blue-500'
                    }`}>
                      {n.tipo === 'desactivar' ? <UserX size={16} /> : n.tipo === 'registro' ? <UserPlus size={16} /> : <Info size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-700 leading-tight">{n.texto}</p>
                      <span className="text-[10px] text-gray-400 font-bold">{n.hora}</span>
                    </div>
                  </div>
                  <button onClick={(e) => eliminarNotificacion(n.id, e)} className="text-gray-200 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificaciones;