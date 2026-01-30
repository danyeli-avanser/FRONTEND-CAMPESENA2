// src/componentes/layout/ContenedorPagina.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import BarraLateral from './BarraLateral';
import BarraNavegacion from './BarraNavegacion';

const ContenedorPagina = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Menú lateral: Se mantiene fijo a la izquierda */}
      <BarraLateral />

      {/* 2. Área de Contenido: Header superior + el espacio para las vistas */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Barra de navegación superior (Header institucional) */}
        <BarraNavegacion />
        
        {/* 3. El "Contenedor para vistas" real */}
        <main className="p-6">
          {/* Este div blanco es el que hace que el contenido resalte sobre el fondo gris */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-120px)] p-6">
            {/* Outlet es el componente clave: aquí es donde React Router 
                inyectará Dashboard, GestionUsuarios, etc.
            */}
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContenedorPagina;