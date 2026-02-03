import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, Plus, Search, Edit3, Trash2, X, 
  Settings2, ChevronDown, ChevronUp, Check, AlertCircle 
} from 'lucide-react';

const ConfiguracionSistema = () => {
  const location = useLocation();
  const esVistaForm = location.pathname.includes('formularios');

  // Estados
  const [formularios, setFormularios] = useState([
    { id: 1, nombre: 'Datos del Solicitante', desc: 'Informacion personal del campesino o representante', campos: 7, cat: 'Todos', abierto: false },
    { id: 2, nombre: 'Datos Productivos', desc: 'Informacion sobre la actividad productiva del solicitante', campos: 4, cat: 'Todos', abierto: false },
    { id: 3, nombre: 'Solicitud de Capacitacion', desc: 'Campos específicos para solicitudes de capacitacion tecnica', campos: 5, cat: 'Capacitacion', abierto: false },
    { id: 4, nombre: 'Proyecto Productivo', desc: 'Campos específicos para registro de proyectos productivos', campos: 5, cat: 'Proyecto', abierto: false },
  ]);

  return (
    <div className="p-8 bg-[#f8faf8] min-h-screen animate-in fade-in duration-500">
      {/* Header Dinámico */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-800">
            {esVistaForm ? 'Formularios Dinámicos' : 'Documentos Obligatorios'}
          </h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase">
            {esVistaForm ? 'Configura los campos de los formularios del sistema' : 'Configura los documentos requeridos por tipo de solicitud'}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-300" size={16} />
          <input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs outline-none w-64 shadow-sm" />
        </div>
      </div>

      {/* Stats Cards (Basado en imágenes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {esVistaForm ? (
          <>
            <StatCard label="Formularios" value="4" icon={<FileText size={20} />} />
            <StatCard label="Campos totales" value="21" icon={<Settings2 size={20} />} />
            <StatCard label="Formularios activos" value="4" icon={<Check size={20} />} />
          </>
        ) : (
          <>
            <StatCard label="Documentos Configurados" value="8" icon={<FileText size={20} />} />
            <StatCard label="Obligatorios" value="5" icon={<AlertCircle size={20} />} />
            <StatCard label="Opcionales" value="3" icon={<Check size={20} />} />
          </>
        )}
      </div>

      {/* Barra de Filtros */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {(esVistaForm ? ['Todos', 'Capacitacion', 'Proyecto'] : ['Todos', 'Campesino', 'Asociacion']).map(f => (
            <button key={f} className="px-4 py-2 bg-white text-gray-400 text-[10px] font-black uppercase rounded-xl border border-gray-100 hover:bg-gray-50">{f}</button>
          ))}
        </div>
        <button className="bg-[#39a900] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-black text-[11px] uppercase shadow-md">
          <Plus size={18} /> {esVistaForm ? 'Nuevo Formulario' : 'Nuevo Documento'}
        </button>
      </div>

      {/* Contenido Principal */}
      <div className={esVistaForm ? "space-y-4" : "bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden"}>
        {esVistaForm ? (
          formularios.map(form => (
            <div key={form.id} className="bg-white border border-gray-100 rounded-[1.5rem] shadow-sm overflow-hidden">
              <div 
                onClick={() => setFormularios(formularios.map(f => f.id === form.id ? {...f, abierto: !f.abierto} : f))}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-[#39a900] rounded-xl"><FileText size={20}/></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-gray-800">{form.nombre}</span>
                      <span className="px-2 py-0.5 bg-green-100 text-[#39a900] text-[8px] font-black rounded uppercase">Activo</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">{form.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{form.campos} campos</span>
                  {form.abierto ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <tr>
                <th className="p-5">Documento</th>
                <th className="p-5">Formatos</th>
                <th className="p-5">Tamano Max</th>
                <th className="p-5">Tipo Usuario</th>
                <th className="p-5">Obligatorio</th>
                <th className="p-5 text-center">Estado</th>
                <th className="p-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* Ejemplo Fila Documento */}
              <tr className="hover:bg-gray-50/30">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="text-red-400"><FileText size={18}/></div>
                    <div>
                        <p className="text-[11px] font-black text-gray-800">Documento de Identidad</p>
                        <p className="text-[9px] text-gray-400">Cédula de ciudadanía o documento...</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                    <div className="flex gap-1">
                        {['PDF','JPG','PNG'].map(f => <span key={f} className="px-2 py-0.5 bg-gray-100 rounded text-[8px] font-black text-gray-500">{f}</span>)}
                    </div>
                </td>
                <td className="p-5 text-[10px] font-bold text-gray-500">5 MB</td>
                <td className="p-5"><span className="px-2 py-1 bg-green-50 text-[#39a900] rounded text-[8px] font-black uppercase">Todos</span></td>
                <td className="p-5 text-center"><span className="text-[10px] font-black text-[#39a900]">Si</span></td>
                <td className="p-5 text-center">
                    <div className="w-10 h-5 bg-[#39a900] rounded-full p-1 mx-auto"><div className="bg-white w-3 h-3 rounded-full translate-x-5" /></div>
                </td>
                <td className="p-5">
                    <div className="flex justify-center gap-2">
                        <button className="text-gray-400"><Edit3 size={14}/></button>
                        <button className="text-red-300"><Trash2 size={14}/></button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex justify-between items-center">
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{label}</p>
      <p className="text-3xl font-black text-gray-800">{value}</p>
    </div>
    <div className="p-4 bg-gray-50 rounded-2xl text-gray-300">{icon}</div>
  </div>
);

export default ConfiguracionSistema;