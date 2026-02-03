import React from 'react';
import Notificaciones from './Notificaciones'; // Importamos tu componente de campana

const BarraNavegacion = () => {
  return (
    <nav className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm">
      {/* Lado Izquierdo: Título del Sistema */}
      <div className="flex items-center gap-4">
        <h1 className="text-[#042b18] font-black tracking-tight text-lg uppercase">
          Sistema de Gestión
        </h1>
      </div>

      {/* Lado Derecho: Notificaciones y Perfil */}
      <div className="flex items-center gap-6">
        
        {/* Componente dinámico de Notificaciones */}
        <Notificaciones />

        {/* Información del perfil del Administrador */}
        <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
          <div className="text-right">
            <p className="text-xs font-black text-[#042b18] uppercase tracking-tighter">
              Admin Campesena
            </p>
            <p className="text-[10px] font-bold text-[#39a900]">
              SEDE CENTRAL
            </p>
          </div>
          
          {/* Avatar del Administrador */}
          <div className="w-10 h-10 bg-[#39a900] rounded-full flex items-center justify-center text-white shadow-lg">
             <span className="font-bold">A</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;