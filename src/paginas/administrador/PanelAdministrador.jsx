import React from 'react';

const CardMetrica = ({ titulo, valor, cambio, icono, colorIcono }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-gray-500 font-medium">{titulo}</p>
        <h3 className="text-3xl font-bold mt-1">{valor}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorIcono}`}>
        {icono}
      </div>
    </div>
    <p className="text-xs text-[#39a900] font-semibold">
      {cambio} <span className="text-gray-400 font-normal">vs mes anterior</span>
    </p>
  </div>
);

const PanelAdministrador = () => {
  return (
    <div className="p-8 ml-64 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Resumen general del sistema CampeSENA</p>
      </header>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <CardMetrica titulo="Total Solicitudes" valor="248" cambio="+12%" colorIcono="bg-green-100 text-green-700" />
        <CardMetrica titulo="Campesinos" valor="186" cambio="+8%" colorIcono="bg-blue-100 text-blue-700" />
        <CardMetrica titulo="Asociaciones" valor="42" cambio="0%" colorIcono="bg-purple-100 text-purple-700" />
        <CardMetrica titulo="Gestores SENA" valor="12" cambio="+2" colorIcono="bg-orange-100 text-orange-700" />
        <CardMetrica titulo="Validadas" valor="125" cambio="+15%" colorIcono="bg-teal-100 text-teal-700" />
        <CardMetrica titulo="Pendientes" valor="75" cambio="-5%" colorIcono="bg-gray-100 text-gray-700" />
      </div>

      {/* Sección de Gráficos (Simulada) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="font-bold mb-6">Actividad del Sistema</h4>
          <div className="h-64 flex items-end justify-between px-4 border-b border-l">
            {/* Aquí iría un componente de Recharts */}
            <div className="bg-[#39a900]/20 w-12 h-32 rounded-t"></div>
            <div className="bg-[#39a900]/40 w-12 h-48 rounded-t"></div>
            <div className="bg-[#39a900]/20 w-12 h-40 rounded-t"></div>
            <div className="bg-[#39a900] w-12 h-56 rounded-t"></div>
          </div>
          <p className="text-center mt-4 text-xs text-gray-400 italic">Solicitudes registradas vs validadas por mes</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="font-bold mb-6">Distribución por Estado</h4>
          {/* Simulación de Donut Chart */}
          <div className="flex flex-col items-center">
             <div className="w-40 h-40 rounded-full border-[12px] border-green-500 border-t-red-500 border-l-blue-400 relative flex items-center justify-center">
                <span className="text-xl font-bold">248</span>
             </div>
             <div className="mt-6 w-full space-y-2 text-sm">
                <div className="flex justify-between"><span>Registradas</span> <span className="font-bold">35</span></div>
                <div className="flex justify-between"><span>En Revisión</span> <span className="font-bold">20</span></div>
                <div className="flex justify-between"><span>Validadas</span> <span className="font-bold">125</span></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelAdministrador;