import React, { useState } from 'react';
import { Layout, Globe, Image as ImageIcon, Link2, Eye, Save, Megaphone, Settings } from 'lucide-react';

const PortalConfig = () => {
  const [config, setConfig] = useState({
    sitioActivo: true,
    inscripcionesAbiertas: true,
  });

  const verdeOscuro = "bg-[#003921]"; // Color institucional
  const verdeClaro = "bg-[#39a900]"; // Color de acción

  return (
    <div className="p-4 md:p-6 bg-[#f8faf8] min-h-screen animate-in fade-in duration-500">
      {/* Encabezado Estilo CampesENA */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-800 tracking-tight">Configuración del Portal</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
            Gestiona la interfaz pública y avisos institucionales
          </p>
        </div>
        <div className={`px-4 py-2 ${verdeOscuro} text-white rounded-2xl flex items-center gap-2 shadow-lg`}>
          <Globe size={16} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Portal en Línea</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SECCIÓN 1: CONTENIDO VISUAL (Banners y Avisos) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 ${verdeOscuro} text-white rounded-xl`}><ImageIcon size={18}/></div>
              <h2 className="text-sm font-black text-gray-700 uppercase italic">Gestión de Banner Principal</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors group cursor-pointer">
                <Megaphone className="text-gray-300 mb-3 group-hover:scale-110 transition-transform" size={40} />
                <p className="text-[11px] font-bold text-gray-400 uppercase text-center max-w-[200px]">
                  Sube la imagen para la convocatoria actual
                </p>
                <button className={`mt-4 px-6 py-2 ${verdeClaro} text-white rounded-full text-[10px] font-black uppercase shadow-lg shadow-green-100`}>
                  Seleccionar Archivo
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-2">Título de Bienvenida</label>
                <input className="w-full p-4 bg-gray-50 rounded-2xl text-xs outline-none border border-transparent focus:border-green-900/10 transition-all font-bold text-gray-700" placeholder="Ej: ¡Bienvenidos a la Convocatoria 2026!" />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: ENLACES EXTERNOS */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 ${verdeOscuro} text-white rounded-xl`}><Link2 size={18}/></div>
              <h2 className="text-sm font-black text-gray-700 uppercase">Enlaces de Interés</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Manual de Inscripción</p>
                    <p className="text-[10px] text-blue-500 font-bold truncate">https://campesena.sena.edu.co/guia</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Página SENA Central</p>
                    <p className="text-[10px] text-blue-500 font-bold truncate">https://www.sena.edu.co</p>
                </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: ESTADOS Y PUBLICACIÓN */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20">
            <h2 className="text-xs font-black text-gray-800 uppercase mb-6 flex items-center gap-2">
               <Settings size={14} /> Controles de Publicación
            </h2>
            
            <div className="space-y-4">
              <ToggleItem 
                label="Publicar Portal Web" 
                info="Activa/Desactiva la vista pública"
                active={config.sitioActivo} 
                onClick={() => setConfig({...config, sitioActivo: !config.sitioActivo})} 
              />
              <ToggleItem 
                label="Inscripciones Abiertas" 
                info="Habilita el formulario de registro"
                active={config.inscripcionesAbiertas} 
                onClick={() => setConfig({...config, inscripcionesAbiertas: !config.inscripcionesAbiertas})} 
              />
            </div>

            <div className="mt-8 space-y-3">
              <button className={`w-full py-4 ${verdeClaro} text-white rounded-2xl font-black text-[11px] uppercase shadow-xl shadow-green-100 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2`}>
                <Save size={16}/> Guardar Configuración
              </button>
              <button className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-[11px] uppercase flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <Eye size={16}/> Ver Vista Previa
              </button>
            </div>
          </div>

          <div className="p-6 bg-orange-50 rounded-[2.5rem] border border-orange-100">
             <div className="flex items-center gap-2 text-orange-600 mb-2">
                <Settings size={16} />
                <span className="text-[10px] font-black uppercase">Nota del Sistema</span>
             </div>
             <p className="text-[10px] text-orange-700/80 font-bold leading-relaxed italic">
                Cualquier cambio realizado en esta sección se verá reflejado inmediatamente en la página de inicio del portal CampesENA.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-componente para los Toggles
const ToggleItem = ({ label, info, active, onClick }) => (
  <div className="flex justify-between items-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 cursor-pointer group" onClick={onClick}>
    <div>
      <p className="text-[10px] font-black text-gray-700 uppercase leading-none mb-1">{label}</p>
      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{info}</p>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${active ? 'bg-[#39a900]' : 'bg-gray-300'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${active ? 'left-7' : 'left-1'}`} />
    </div>
  </div>
);

export default PortalConfig;