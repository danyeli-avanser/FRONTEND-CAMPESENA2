import React from 'react';
import { Outlet } from 'react-router-dom';
import BarraLateral from './BarraLateral';
import BarraNavegacion from './BarraNavegacion';

const ContenedorPagina = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <BarraLateral />

      <div className="flex-1 ml-64 flex flex-col">
        <BarraNavegacion />
        
        <main className="p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-120px)] p-6">

            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContenedorPagina;