import React from 'react';
import { FileText, Users, UserCheck,ClipboardList,CheckCircle2,Clock,TrendingUp} from 'lucide-react';

const CardMetrica = ({ titulo, valor, cambio, icono, colorIcono, esPositivo = true }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{titulo}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-800">{valor}</h3>
      </div>
      <div className={`p-2.5 rounded-lg ${colorIcono}`}>
        {icono}
      </div>
    </div>
    <div className="flex items-center gap-1">
      <TrendingUp size={14} className={esPositivo ? "text-[#39a900]" : "text-red-500"} />
      <p className={`text-xs font-bold ${esPositivo ? "text-[#39a900]" : "text-red-500"}`}>
        {cambio} <span className="text-gray-400 font-normal">vs mes anterior</span>
      </p>
    </div>
  </div>
);

const PanelAdministrador = () => {
  return (
    <div className="space-y-8"> {/* Quitamos ml-64 y p-8 porque el ContenedorPagina ya los tiene */}
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Informativo</h1>
        <p className="text-gray-500 text-sm">Resumen en tiempo real del sistema CampeSENA</p>
      </header>

      {/* Grid de Métricas - 6 Columnas en pantallas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <CardMetrica 
          titulo="Solicitudes" 
          valor="248" 
          cambio="+12%" 
          icono={<FileText size={20}/>} 
          colorIcono="bg-green-100 text-green-700" 
        />
        <CardMetrica 
          titulo="Campesinos" 
          valor="186" 
          cambio="+8%" 
          icono={<Users size={20}/>} 
          colorIcono="bg-blue-100 text-blue-700" 
        />
        <CardMetrica 
          titulo="Asociaciones" 
          valor="42" 
          cambio="0%" 
          icono={<ClipboardList size={20}/>} 
          colorIcono="bg-purple-100 text-purple-700" 
        />
        <CardMetrica 
          titulo="Gestores" 
          valor="12" 
          cambio="+2" 
          icono={<UserCheck size={20}/>} 
          colorIcono="bg-orange-100 text-orange-700" 
        />
        <CardMetrica 
          titulo="Validadas" 
          valor="125" 
          cambio="+15%" 
          icono={<CheckCircle2 size={20}/>} 
          colorIcono="bg-teal-100 text-teal-700" 
        />
        <CardMetrica 
          titulo="Pendientes" 
          valor="75" 
          cambio="-5%" 
          esPositivo={false}
          icono={<Clock size={20}/>} 
          colorIcono="bg-gray-100 text-gray-700" 
        />
      </div>

      {/* Sección de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Barras */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-700">Actividad Mensual</h4>
            <select className="text-xs border rounded px-2 py-1 outline-none text-gray-500">
              <option>Últimos 6 meses</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-around px-4 border-b border-gray-100 relative">
             {/* Líneas de guía de fondo */}
            <div className="absolute w-full h-px bg-gray-50 top-0"></div>
            <div className="absolute w-full h-px bg-gray-50 top-1/4"></div>
            <div className="absolute w-full h-px bg-gray-50 top-2/4"></div>
            <div className="absolute w-full h-px bg-gray-50 top-3/4"></div>
            
            <div className="group relative flex flex-col items-center">
              <div className="bg-[#39a900]/20 w-10 h-32 rounded-t group-hover:bg-[#39a900]/40 transition-colors"></div>
              <span className="text-[10px] text-gray-400 mt-2">Ene</span>
            </div>
            <div className="group relative flex flex-col items-center">
              <div className="bg-[#39a900]/40 w-10 h-48 rounded-t group-hover:bg-[#39a900]/60 transition-colors"></div>
              <span className="text-[10px] text-gray-400 mt-2">Feb</span>
            </div>
            <div className="group relative flex flex-col items-center">
              <div className="bg-[#39a900]/20 w-10 h-40 rounded-t group-hover:bg-[#39a900]/40 transition-colors"></div>
              <span className="text-[10px] text-gray-400 mt-2">Mar</span>
            </div>
            <div className="group relative flex flex-col items-center">
              <div className="bg-[#39a900] w-10 h-56 rounded-t shadow-lg"></div>
              <span className="text-[10px] text-gray-700 font-bold mt-2">Abr</span>
            </div>
          </div>
        </div>

        {/* Gráfico de Torta / Distribución */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-700 mb-6">Estado de Solicitudes</h4>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-44 h-44 rounded-full border-[14px] border-[#39a900] border-t-red-400 border-l-blue-400 relative flex items-center justify-center shadow-inner">
              <div className="text-center">
                <span className="text-3xl font-black block text-gray-800">248</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total</span>
              </div>
            </div>
            
            <div className="mt-8 w-full grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#39a900]"></div>
                <span className="text-gray-600">Validadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                <span className="text-gray-600">En Revisión</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <span className="text-gray-600">Rechazadas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelAdministrador;