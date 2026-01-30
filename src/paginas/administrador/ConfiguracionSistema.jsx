import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Save, 
  Database,
  Globe
} from 'lucide-react';

const ConfiguracionSistema = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Encabezado */}
      <header className="border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Configuración del Sistema</h1>
        <p className="text-gray-500 text-sm">Administra las preferencias generales y seguridad de la plataforma</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Menú de navegación lateral interno */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 bg-green-50 text-[#39a900] rounded-lg font-bold text-sm">
            <User size={18} /> Perfil del Administrador
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Lock size={18} /> Seguridad y Contraseña
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Database size={18} /> Copia de Seguridad
          </button>
        </div>

        {/* Formulario de Configuración */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Sección de Perfil */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-bold text-gray-700 border-b pb-2">
              <ShieldCheck size={20} className="text-[#39a900]" />
              <h2>Ajustes Generales</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre del Sitio</label>
                <input type="text" defaultValue="CampeSENA - Gestión" className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-[#39a900] bg-gray-50" />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-amber-500" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Notificaciones por Correo</p>
                    <p className="text-xs text-gray-500">Recibir avisos de nuevas solicitudes</p>
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#39a900]" />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-blue-500" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Mantenimiento</p>
                    <p className="text-xs text-gray-500">Activar modo de espera en el sistema</p>
                  </div>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-[#39a900]" />
              </div>
            </div>
          </section>

          {/* Botones de Guardar */}
          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
              Descartar
            </button>
            <button className="px-6 py-2 bg-[#39a900] text-white rounded-lg font-bold flex items-center gap-2 hover:bg-[#2e8800] shadow-lg shadow-green-100 transition-all">
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfiguracionSistema;