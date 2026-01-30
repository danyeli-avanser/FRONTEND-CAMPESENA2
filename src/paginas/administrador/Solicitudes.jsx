import React, { useState } from 'react';
import { 
  FileSearch, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Filter,
  Download
} from 'lucide-react';

const Solicitudes = () => {
  // Datos de ejemplo: Solicitudes que llegan de los campesinos
  const [solicitudes] = useState([
    { 
      id: "SOL-102", 
      usuario: "Marcos Galvis", 
      unidad: "Finca El Recreo", 
      linea: "Cacao", 
      fecha: "2026-01-25", 
      estado: "Pendiente" 
    },
    { 
      id: "SOL-101", 
      usuario: "Elena Ospina", 
      unidad: "La Montaña", 
      linea: "Café", 
      fecha: "2026-01-20", 
      estado: "En Revisión" 
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Encabezado con Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Solicitudes</h1>
          <p className="text-sm text-gray-500">Valida y gestiona las unidades productivas registradas</p>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter size={18} /> Filtrar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#39a900] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#2e8800] transition-all">
            <Download size={18} /> Exportar Reporte
          </button>
        </div>
      </div>

      {/* Resumen de estados (Cards pequeñas) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border-l-4 border-amber-400 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Pendientes</p>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-blue-400 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">En Revisión</p>
          <p className="text-2xl font-bold text-gray-800">05</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-[#39a900] shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Aprobadas</p>
          <p className="text-2xl font-bold text-gray-800">84</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-red-400 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Rechazadas</p>
          <p className="text-2xl font-bold text-gray-800">03</p>
        </div>
      </div>

      {/* Tabla de Solicitudes */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">ID / Fecha</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Campesino</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Unidad Productiva</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {solicitudes.map((sol) => (
              <tr key={sol.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-800">{sol.id}</div>
                  <div className="text-xs text-gray-400">{sol.fecha}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{sol.usuario}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-800">{sol.unidad}</div>
                  <div className="text-xs text-[#39a900] font-semibold">{sol.linea}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1 w-fit px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    sol.estado === 'Pendiente' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {sol.estado === 'Pendiente' ? <Clock size={12} /> : <FileSearch size={12} />}
                    {sol.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver Detalles">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-[#39a900] hover:bg-green-50 rounded-lg transition-colors" title="Aprobar">
                      <CheckCircle2 size={18} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Rechazar">
                      <XCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Solicitudes;