// src/componentes/layout/BarraNavegacion.jsx
import React from 'react';
import { User, Bell, Settings } from 'lucide-react';

const BarraNavegacion = ({ tituloPagina }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Título dinámico de la sección */}
      <h2 className="text-lg font-bold text-sena-oscuro uppercase tracking-tight">
        {tituloPagina || 'Sistema de Gestión'}
      </h2>

      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-sena-verde transition-colors">
          <Bell size={20} />
        </button>
        
        <div className="h-8 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-700">Admin Campesena</p>
            <p className="text-[10px] text-sena-verde font-semibold uppercase">Sede Central</p>
          </div>
          <div className="w-9 h-9 bg-sena-verde rounded-full flex items-center justify-center text-white shadow-sm">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BarraNavegacion;