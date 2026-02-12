import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, Plus, Search, Edit3, X, 
  Check, AlertCircle, Save
} from 'lucide-react';

const ConfiguracionSistema = () => {
  const location = useLocation();
  const esVistaForm = location.pathname.includes('formularios');

  // --- ESTADOS ---
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [mostrarModal, setMostrarModal] = useState(false);

  const [documentos, setDocumentos] = useState([
    { id: 1, nombre: 'Documento de Identidad', desc: 'Cédula de ciudadanía o documento...', formatos: ['PDF','JPG','PNG'], tamano: '5 MB', tipo: 'Todos', obligatorio: 'Si', estado: true },
    { id: 2, nombre: 'RUT Actualizado', desc: 'Registro Único Tributario vigente', formatos: ['PDF'], tamano: '2 MB', tipo: 'Todos', obligatorio: 'Si', estado: true },
    { id: 3, nombre: 'Certificado de Tradición', desc: 'Certificado de libertad y tradición', formatos: ['PDF'], tamano: '10 MB', tipo: 'Campesino', obligatorio: 'Si', estado: true },
    { id: 4, nombre: 'Cámara de Comercio', desc: 'Certificado de existencia legal', formatos: ['PDF'], tamano: '5 MB', tipo: 'Asociacion', obligatorio: 'No', estado: false },
  ]);

  // --- LÓGICA DE FILTRADO ---
  const datosFiltrados = useMemo(() => {
    return documentos.filter(d => 
      (filtroActivo === 'Todos' || d.tipo === filtroActivo) &&
      d.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [documentos, filtroActivo, busqueda]);

  const toggleEstado = (id) => {
    setDocumentos(documentos.map(d => d.id === id ? {...d, estado: !d.estado} : d));
  };

  const agregarDocumento = (nuevoDoc) => {
    setDocumentos([...documentos, { ...nuevoDoc, id: Date.now(), estado: true }]);
    setMostrarModal(false);
  };

  return (
    <div className="p-6 bg-[#f8faf8] min-h-screen animate-in fade-in duration-500">
      {/* Header - Más compacto */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-800 tracking-tight">
            {esVistaForm ? 'Formularios Dinámicos' : 'Documentación'}
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {esVistaForm ? 'Configura los campos de los formularios' : 'Configura los requisitos por tipo de solicitud'}
          </p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 text-gray-300 group-focus-within:text-[#003921] transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Buscar documento..." 
            className="pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs outline-none w-64 shadow-sm focus:ring-2 focus:ring-[#003921]/5 transition-all"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Dashboard - Menos padding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Configurados" value={documentos.length} icon={<FileText size={20} />} color="from-green-800 to-[#003921]" />
        <StatCard label="Obligatorios" value={documentos.filter(d => d.obligatorio === 'Si').length} icon={<AlertCircle size={20} />} color="from-orange-400 to-orange-500" />
        <StatCard label="Activos" value={documentos.filter(d => d.estado).length} icon={<Check size={20} />} color="from-blue-500 to-indigo-600" />
      </div>

      {/* Filtros y Botón Nuevo */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-1 p-1 bg-gray-100/50 rounded-xl border border-gray-100">
          {['Todos', 'Campesino', 'Asociacion'].map(f => (
            <button 
              key={f} 
              onClick={() => setFiltroActivo(f)}
              className={`px-4 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${filtroActivo === f ? 'bg-white text-[#003921] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setMostrarModal(true)}
          className="bg-[#003921] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-black text-[10px] uppercase shadow-lg hover:translate-y-[-1px] transition-all"
        >
          <Plus size={16} strokeWidth={3} /> Nuevo Documento
        </button>
      </div>

      {/* Tabla Principal - AJUSTADA PARA QUE NO SE SALGA */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/40 text-[9px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-5 py-3">Documento</th>
                <th className="px-5 py-3 text-center">Formatos</th>
                <th className="px-5 py-3 text-center">Tamaño Máx</th>
                <th className="px-5 py-3 text-center">Tipo Usuario</th>
                <th className="px-5 py-3 text-center">Oblig.</th>
                <th className="px-5 py-3 text-center">Estado</th>
                <th className="px-5 py-3 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {datosFiltrados.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 text-red-500 rounded-lg group-hover:scale-105 transition-transform"><FileText size={16}/></div>
                      <div>
                          <p className="text-[12px] font-black text-gray-800 leading-tight">{doc.nombre}</p>
                          <p className="text-[9px] text-gray-400 font-medium">{doc.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                      <div className="flex gap-1 justify-center">
                          {doc.formatos.map(f => <span key={f} className="px-2 py-0.5 bg-gray-50 text-[8px] font-black text-gray-500 rounded border border-gray-200/50">{f}</span>)}
                      </div>
                  </td>
                  <td className="px-5 py-3 text-center text-[10px] font-bold text-gray-600">{doc.tamano}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase ${doc.tipo === 'Asociacion' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-700'}`}>
                      {doc.tipo}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-[10px] font-black ${doc.obligatorio === 'Si' ? 'text-[#39a900]' : 'text-gray-300'}`}>
                      {doc.obligatorio}
                    </span>
                  </td>
                  
                  <td className="px-5 py-3 text-center">
                      <button 
                        onClick={() => toggleEstado(doc.id)}
                        className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all ${doc.estado ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                      >
                        {doc.estado ? 'ACTIVO' : 'INACTIVO'}
                      </button>
                  </td>

                  <td className="px-5 py-3">
                      <div className="flex justify-end">
                          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#f0f9ed] border border-[#a8e0a4] rounded-full text-[#39a900] hover:bg-[#39a900] hover:text-white transition-all">
                            <Edit3 size={14} />
                            <span className="font-black text-[10px] uppercase">EDITAR</span>
                          </button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL - Ajustado también */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 bg-[#003921] text-white flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black uppercase italic">Nuevo Requisito</h2>
                <p className="text-[9px] font-bold opacity-80 uppercase tracking-widest">Configuración CampesENA</p>
              </div>
              <button onClick={() => setMostrarModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form className="p-6 space-y-4" onSubmit={(e) => {
              e.preventDefault();
              agregarDocumento({
                nombre: e.target.nombre.value,
                desc: e.target.desc.value,
                formatos: ['PDF'],
                tamano: '5 MB',
                tipo: e.target.tipo.value,
                obligatorio: e.target.obligatorio.checked ? 'Si' : 'No'
              });
            }}>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Nombre</label>
                <input name="nombre" required className="w-full p-3 bg-gray-50 rounded-xl text-xs outline-none border border-transparent focus:border-[#003921]/20" placeholder="Ej: Certificado de Tradición" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Descripción</label>
                <input name="desc" className="w-full p-3 bg-gray-50 rounded-xl text-xs outline-none border border-transparent focus:border-[#003921]/20" placeholder="¿Para qué sirve?" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase ml-1">Usuario</label>
                  <select name="tipo" className="w-full p-3 bg-gray-50 rounded-xl text-xs outline-none font-bold text-gray-600">
                    <option value="Todos">Todos</option>
                    <option value="Campesino">Campesino</option>
                    <option value="Asociacion">Asociación</option>
                  </select>
                </div>
                <div className="flex items-center justify-center bg-gray-50 rounded-xl mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input name="obligatorio" type="checkbox" className="w-4 h-4 accent-[#003921]" />
                    <span className="text-[9px] font-black text-gray-600 uppercase">¿Oblig?</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#003921] text-white py-3 rounded-xl font-black text-[11px] uppercase shadow-lg mt-2 flex items-center justify-center gap-2">
                <Save size={16}/> Guardar Requisito
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="relative overflow-hidden bg-white p-5 rounded-3xl shadow-sm border border-gray-100 group transition-all">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-5 rounded-bl-full`} />
    <div className="flex justify-between items-center relative z-10">
      <div>
        <p className="text-[9px] font-black text-gray-400 uppercase mb-1">{label}</p>
        <p className="text-3xl font-black text-gray-800 tracking-tight">{value}</p>
      </div>
      <div className={`p-3 bg-gradient-to-br ${color} text-white rounded-2xl shadow-lg transition-transform group-hover:scale-110`}>
        {icon}
      </div>
    </div>
  </div>
);

export default ConfiguracionSistema;