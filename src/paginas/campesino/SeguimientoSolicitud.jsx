import React from 'react';
import { Clock, CheckCircle, AlertCircle, FileText, Search } from 'lucide-react';

const SeguimientoSolicitud = () => {
  // Datos de ejemplo para las solicitudes del campesino
  const solicitudes = [
    {
      id: "SOL-001",
      finca: "La Esperanza",
      fecha: "20/10/2025",
      estado: "En Revisión",
      color: "text-amber-500 bg-amber-50",
      icono: <Clock size={16} />
    },
    {
      id: "SOL-002",
      finca: "El Recuerdo",
      fecha: "15/09/2025",
      estado: "Aprobado",
      color: "text-[#39a900] bg-green-50",
      icono: <CheckCircle size={16} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mis Solicitudes</h1>
          <p className="text-sm text-gray-500">Consulta el estado de tus trámites en tiempo real</p>
        </div>
        <div className="bg-white border rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Buscar por ID..." className="outline-none text-sm w-32" />
        </div>
      </div>

      {/* Lista de Solicitudes */}
      <div className="grid gap-4">
        {solicitudes.map((sol) => (
          <div key={sol.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${sol.color}`}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{sol.finca}</h3>
                  <p className="text-xs text-gray-400 font-mono">{sol.id}</p>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                    Registrada el: <span className="font-medium">{sol.fecha}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${sol.color}`}>
                  {sol.icono}
                  {sol.estado}
                </div>
                <button className="text-sm font-bold text-[#39a900] hover:underline">
                  Ver detalles
                </button>
              </div>

            </div>

            {/* Línea de tiempo simplificada (Solo aparece si está en revisión) */}
            {sol.estado === "En Revisión" && (
              <div className="mt-6 pt-4 border-t border-gray-50">
                <div className="flex items-center justify-between max-w-md mx-auto relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[#39a900]"></div>
                    <span className="text-[10px] mt-1 font-bold">Recibido</span>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse"></div>
                    <span className="text-[10px] mt-1 font-bold text-amber-500">Evaluando</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                    <span className="text-[10px] mt-1 font-bold text-gray-300">Respuesta</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mensaje de ayuda */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
        <AlertCircle className="text-blue-500 shrink-0" size={20} />
        <p className="text-sm text-blue-700">
          Si tu solicitud aparece como <strong>"Rechazada"</strong>, revisa los detalles para ver qué documentos debes corregir y vuelve a intentarlo.
        </p>
      </div>
    </div>
  );
};

export default SeguimientoSolicitud;