import React from 'react';
import { Outlet } from 'react-router-dom';
import BarraLateral from './BarraLateral';
import BarraNavegacion from './BarraNavegacion';

const ContenedorPagina = ({ notificaciones }) => {
  return (
    <div className="flex min-h-screen bg-[#f8faf8]">
      {/* 1. Menú lateral fijo */}
      <BarraLateral />

      {/* 2. Contenido derecho (ml-64 para no taparse con la barra fija) */}
      <div className="flex-1 ml-64 flex flex-col">
        
        {/* Pasamos las notificaciones a la barra superior para que la campana funcione */}
        <BarraNavegacion notificaciones={notificaciones} />
        
        <main className="flex-1">
          {/* Quitamos el div bg-white de aquí porque cada página 
             (Configuración, Auditoría, Roles) ya trae su propio diseño 
             y así evitamos doble margen.
          */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default ContenedorPagina;