import React from 'react';
import { 
  FilePlus, 
  ClipboardCheck, 
  Bell, 
  User, 
  ArrowRight,
  Sprout,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PanelCampesino = () => {
  // Datos simulados para el resumen
  const estadisticas = [
    { label: 'Solicitudes Activas', valor: '2', color: 'text-blue-600' },
    { label: 'Aprobadas', valor: '1', color: 'text-[#39a900]' },
    { label: 'Notificaciones', valor: '3', color: 'text-amber-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Bienvenida personalizada */}
      <div className="bg-[#00324d] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">¡Hola de nuevo!</h1>
          <p className="text-blue-100 flex items-center gap-2">
            <Sprout size={18} />
            Bienvenido a tu portal CampeSENA
          </p>
        </div>
        {/* Decoración de fondo */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <Sprout size={200} />
        </div>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {estadisticas.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.valor}</p>
          </div>
        ))}
      </div>

      {/* Acciones Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/campesino/nueva-solicitud"
          className="group bg-white p-6 rounded-2xl border-2 border-transparent hover:border-[#39a900] shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 text-[#39a900] rounded-xl group-hover:bg-[#39a900] group-hover:text-white transition-colors">
              <FilePlus size={28} />
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-[#39a900] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Nueva Solicitud</h3>
          <p className="text-gray-500 text-sm mt-2">Registra una nueva unidad productiva o solicita validación técnica.</p>
        </Link>

        <Link 
          to="/campesino/seguimiento"
          className="group bg-white p-6 rounded-2xl border-2 border-transparent hover:border-blue-500 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ClipboardCheck size={28} />
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Ver Mis Trámites</h3>
          <p className="text-gray-500 text-sm mt-2">Consulta el estado actual de tus solicitudes y descarga certificados.</p>
        </Link>
      </div>

      {/* Próximos Eventos / Avisos */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
          <Calendar size={18} className="text-[#39a900]" />
          <h3 className="font-bold text-gray-700">Avisos Importantes</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex gap-4 items-start border-l-4 border-[#39a900] pl-4">
            <div>
              <p className="text-sm font-bold text-gray-800">Visita Técnica Programada</p>
              <p className="text-xs text-gray-500 mt-1">Tu solicitud en "La Esperanza" tendrá visita el 15 de Noviembre.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start border-l-4 border-blue-400 pl-4">
            <div>
              <p className="text-sm font-bold text-gray-800">Nueva Convocatoria</p>
              <p className="text-xs text-gray-500 mt-1">Inscríbete a los cursos de tecnificación de cacao disponibles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelCampesino;