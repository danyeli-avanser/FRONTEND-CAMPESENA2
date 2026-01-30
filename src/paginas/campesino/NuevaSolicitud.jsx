import React from 'react';
import { Save, Upload, MapPin, ClipboardList, Image as ImageIcon } from 'lucide-react';

const NuevaSolicitud = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Encabezado */}
      <header className="border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Nueva Solicitud de Validación</h1>
        <p className="text-gray-500 text-sm">Registra tu unidad productiva para recibir los beneficios de CampeSENA</p>
      </header>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* Bloque 1: Datos de la Unidad */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#39a900] font-bold border-b pb-2">
            <ClipboardList size={20} />
            <h2>Datos de la Unidad</h2>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nombre de la Finca</label>
            <input type="text" className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-[#39a900] bg-gray-50" placeholder="Ej: Finca La Bonita" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Actividad Principal</label>
            <select className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-[#39a900] bg-white text-sm">
              <option>Cultivo de Café</option>
              <option>Producción de Cacao</option>
              <option>Ganadería Sostenible</option>
              <option>Apicultura</option>
            </select>
          </div>
        </div>

        {/* Bloque 2: Ubicación */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#39a900] font-bold border-b pb-2">
            <MapPin size={20} />
            <h2>Ubicación</h2>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Vereda / Corregimiento</label>
            <input type="text" className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-[#39a900] bg-gray-50" placeholder="Nombre de la vereda" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Hectáreas aproximadas</label>
            <input type="number" className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-[#39a900] bg-gray-50" placeholder="0" />
          </div>
        </div>

        {/* Bloque 3: Soportes (Ocupa las dos columnas) */}
        <div className="md:col-span-2 bg-gray-50 p-8 rounded-xl border-2 border-dashed border-gray-200 text-center space-y-4">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-white rounded-full shadow-sm mb-2 text-[#39a900]">
              <Upload size={32} />
            </div>
            <h3 className="font-bold text-gray-700">Documentos y Fotos</h3>
            <p className="text-xs text-gray-400">Sube el PDF de tu cédula y fotos de la producción</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button type="button" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
              <ImageIcon size={16} /> Subir Foto Finca
            </button>
            <button type="button" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
              <Upload size={16} /> Subir Documento Identidad
            </button>
          </div>
        </div>

        {/* Botones de Envío */}
        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button type="button" className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">
            Cancelar
          </button>
          <button type="submit" className="px-8 py-2.5 bg-[#39a900] text-white rounded-lg font-bold flex items-center gap-2 hover:bg-[#2e8800] shadow-lg shadow-green-100 transition-all">
            <Save size={18} />
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevaSolicitud;