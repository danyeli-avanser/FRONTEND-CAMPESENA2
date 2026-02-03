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
    <div className="p-8 bg-[#f8faf8] min-h-screen animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            {esVistaForm ? 'Formularios Dinámicos' : 'Documentación'}
          </h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            {esVistaForm ? 'Configura los campos de los formularios' : 'Configura los requisitos por tipo de solicitud'}
          </p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-3 text-gray-300 group-focus-within:text-[#003921] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Buscar documento..." 
            className="pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs outline-none w-72 shadow-sm focus:ring-4 focus:ring-[#003921]/5 transition-all"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Configurados" value={documentos.length} icon={<FileText size={24} />} color="from-green-800 to-[#003921]" />
        <StatCard label="Obligatorios" value={documentos.filter(d => d.obligatorio === 'Si').length} icon={<AlertCircle size={24} />} color="from-orange-400 to-orange-500" />
        <StatCard label="Activos" value={documentos.filter(d => d.estado).length} icon={<Check size={24} />} color="from-blue-500 to-indigo-600" />
      </div>

      {/* Filtros y Botón Nuevo - CAMBIO A VERDE OSCURO */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2 p-1.5 bg-gray-100/50 rounded-2xl border border-gray-100">
          {['Todos', 'Campesino', 'Asociacion'].map(f => (
            <button 
              key={f} 
              onClick={() => setFiltroActivo(f)}
              className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${filtroActivo === f ? 'bg-white text-[#003921] shadow-sm transform scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setMostrarModal(true)}
          className="bg-[#003921] text-white px-7 py-3.5 rounded-2xl flex items-center gap-3 font-black text-xs uppercase shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all"
        >
          <Plus size={20} strokeWidth={3} /> Nuevo Documento
        </button>
      </div>

      {/* Tabla Principal */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/40 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
            <tr>
              <th className="p-6">Documento</th>
              <th className="p-6">Formatos</th>
              <th className="p-6">Tamaño Máx</th>
              <th className="p-6">Tipo Usuario</th>
              <th className="p-6">Obligatorio</th>
              <th className="p-6 text-center">Estado</th>
              <th className="p-6 text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {datosFiltrados.map(doc => (
              <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-500 rounded-2xl group-hover:scale-110 transition-transform"><FileText size={20}/></div>
                    <div>
                        <p className="text-[13px] font-black text-gray-800 leading-none mb-1">{doc.nombre}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{doc.desc}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-[10px] font-black text-gray-500">
                    <div className="flex gap-1.5">
                        {doc.formatos.map(f => <span key={f} className="px-2.5 py-1 bg-gray-100 rounded-lg border border-gray-200/50">{f}</span>)}
                    </div>
                </td>
                <td className="p-6 text-xs font-bold text-gray-600">{doc.tamano}</td>
                <td className="p-6">
                  <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase ${doc.tipo === 'Asociacion' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-700'}`}>
                    {doc.tipo}
                  </span>
                </td>
                <td className="p-6"><span className={`text-[11px] font-black ${doc.obligatorio === 'Si' ? 'text-green-600' : 'text-gray-300'}`}>{doc.obligatorio}</span></td>
                
                <td className="p-6 text-center">
                    <button 
                      onClick={() => toggleEstado(doc.id)}
                      className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${doc.estado ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                    >
                      {doc.estado ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                </td>

                <td className="p-6">
                    <div className="flex justify-center">
                        <button className="flex items-center gap-3 px-6 py-2 bg-[#f0f9ed] border-2 border-[#a8e0a4] rounded-full text-[#39a900] hover:bg-[#39a900] hover:text-white transition-all group">
                          <Edit3 size={18} strokeWidth={2.5} />
                          <span className="font-black text-sm tracking-wide uppercase">EDITAR</span>
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL NUEVO DOCUMENTO - CAMBIO A VERDE OSCURO */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-[#003921] text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black uppercase italic">Nuevo Requisito</h2>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Configuración CampesENA</p>
              </div>
              <button onClick={() => setMostrarModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X/></button>
            </div>
            
            <form className="p-8 space-y-5" onSubmit={(e) => {
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
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Nombre del documento</label>
                <input name="nombre" required className="w-full p-4 bg-gray-50 rounded-2xl text-sm outline-none border border-transparent focus:border-[#003921]/20" placeholder="Ej: Certificado de Tradición" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Descripción breve</label>
                <input name="desc" className="w-full p-4 bg-gray-50 rounded-2xl text-sm outline-none border border-transparent focus:border-[#003921]/20" placeholder="¿Para qué sirve este documento?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Tipo de Usuario</label>
                  <select name="tipo" className="w-full p-4 bg-gray-50 rounded-2xl text-sm outline-none appearance-none font-bold text-gray-600">
                    <option value="Todos">Todos</option>
                    <option value="Campesino">Campesino</option>
                    <option value="Asociacion">Asociación</option>
                  </select>
                </div>
                <div className="flex items-center justify-center bg-gray-50 rounded-2xl mt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input name="obligatorio" type="checkbox" className="w-5 h-5 accent-[#003921]" />
                    <span className="text-[10px] font-black text-gray-600 uppercase">¿Obligatorio?</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#003921] text-white py-4 rounded-2xl font-black text-xs uppercase shadow-lg shadow-green-900/20 mt-4 flex items-center justify-center gap-2">
                <Save size={18}/> Guardar Configuración
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="relative overflow-hidden bg-white p-7 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-bl-full`} />
    <div className="flex justify-between items-center relative z-10">
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-tighter">{label}</p>
        <p className="text-4xl font-black text-gray-800 tracking-tight">{value}</p>
      </div>
      <div className={`p-4 bg-gradient-to-br ${color} text-white rounded-[1.5rem] shadow-lg shadow-gray-200 transition-transform group-hover:rotate-12`}>
        {icon}
      </div>
    </div>
  </div>
);

export default ConfiguracionSistema;