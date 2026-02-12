import React, { useState, useMemo } from 'react';
import { 
  Search, Download, MoreHorizontal, Bell, FileText, 
  ChevronLeft, ChevronRight, Filter
} from 'lucide-react';

const Solicitudes = () => {
  // --- 1. ESTADOS PARA FILTROS ---
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos los estados");
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  // --- 2. DATOS (Igualitos a tu captura) ---
  const [datos] = useState([
    { id: 'SOL-2024-001', solicitante: 'Juan Carlos Mendez', tipoUsuario: 'Campesino', tipo: 'Capacitacion', ubicacion: 'Popayan, Cauca', fecha: '2024-01-15', prioridad: 'Alta', estado: 'Registrada', gestor: 'Sin asignar' },
    { id: 'SOL-2024-002', solicitante: 'Asociacion Cafe del Cauca', tipoUsuario: 'Asociacion', tipo: 'Proyecto', ubicacion: 'Santander de Quilichao, Cauca', fecha: '2024-01-14', prioridad: 'Alta', estado: 'En revision', gestor: 'Maria Rodriguez' },
    { id: 'SOL-2024-003', solicitante: 'Maria Elena Rodriguez', tipoUsuario: 'Campesino', tipo: 'Proyecto', ubicacion: 'Piendamo, Cauca', fecha: '2024-01-13', prioridad: 'Media', estado: 'En ajustes', gestor: 'Carlos Gomez' },
    { id: 'SOL-2024-004', solicitante: 'Cooperativa Agro Norte', tipoUsuario: 'Asociacion', tipo: 'Capacitacion', ubicacion: 'Corinto, Cauca', fecha: '2024-01-12', prioridad: 'Baja', estado: 'Validada', gestor: 'Maria Rodriguez' },
    { id: 'SOL-2024-005', solicitante: 'Pedro Antonio Vargas', tipoUsuario: 'Campesino', tipo: 'Capacitacion', ubicacion: 'Timbio, Cauca', fecha: '2024-01-11', prioridad: 'Media', estado: 'Validada para envio', gestor: 'Carlos Gomez' },
    { id: 'SOL-2024-006', solicitante: 'Asociacion Productores de Platano', tipoUsuario: 'Asociacion', tipo: 'Proyecto', ubicacion: 'El Tambo, Cauca', fecha: '2024-01-10', prioridad: 'Alta', estado: 'En revision', gestor: 'Maria Rodriguez' },
    { id: 'SOL-2024-007', solicitante: 'Luis Fernando Caicedo', tipoUsuario: 'Campesino', tipo: 'Capacitacion', ubicacion: 'Patia, Cauca', fecha: '2024-01-09', prioridad: 'Media', estado: 'Registrada', gestor: 'Sin asignar' },
    { id: 'SOL-2024-008', solicitante: 'Rosa Maria Gonzalez', tipoUsuario: 'Campesino', tipo: 'Proyecto', ubicacion: 'Bolivar, Cauca', fecha: '2024-01-08', prioridad: 'Baja', estado: 'Validada', gestor: 'Carlos Gomez' },
  ]);

  // --- 3. LÓGICA DE FILTRADO REAL ---
  const solicitudesFiltradas = useMemo(() => {
    return datos.filter(sol => {
      const cumpleBusqueda = sol.solicitante.toLowerCase().includes(busqueda.toLowerCase()) || 
                             sol.id.toLowerCase().includes(busqueda.toLowerCase());
      const cumpleEstado = filtroEstado === "Todos los estados" || sol.estado === filtroEstado;
      const cumpleTipo = filtroTipo === "Todos" || sol.tipo === filtroTipo;
      return cumpleBusqueda && cumpleEstado && cumpleTipo;
    });
  }, [busqueda, filtroEstado, filtroTipo, datos]);

  // --- 4. FUNCIÓN EXPORTAR (Genera un CSV descargable) ---
  const exportarData = () => {
    const encabezados = "Numero,Solicitante,Tipo,Ubicacion,Fecha,Prioridad,Estado,Gestor\n";
    const filas = solicitudesFiltradas.map(s => `${s.id},${s.solicitante},${s.tipo},${s.ubicacion},${s.fecha},${s.prioridad},${s.estado},${s.gestor}`).join("\n");
    const blob = new Blob([encabezados + filas], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_Solicitudes_${new Date().toLocaleDateString()}.csv`;
    a.click();
  };

  return (
    <div className="p-8 bg-[#f8faf8] min-h-screen font-sans">
      {/* HEADER BUSCADOR SUPERIOR */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Solicitudes</h1>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Gestión de solicitudes de campesinos y asociaciones</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl text-xs outline-none w-64 shadow-sm"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <StatCard label="Todas" value={datos.length} />
        <StatCard label="Registradas" value={datos.filter(s => s.estado === 'Registrada').length} />
        <StatCard label="En Revision" value={datos.filter(s => s.estado === 'En revision').length} />
        <StatCard label="En Ajustes" value={datos.filter(s => s.estado === 'En ajustes').length} color="text-red-500" />
        <StatCard label="Validadas" value={datos.filter(s => s.estado.includes('Validada')).length} color="text-[#39a900]" />
      </div>

      {/* BARRA DE FILTROS ACCIÓN */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-300" size={14} />
            <input 
              type="text" 
              placeholder="Buscar por numero, solicitante o municipio..." 
              className="pl-9 pr-4 py-2 bg-[#f8faf8] border-none rounded-xl text-[11px] w-72 outline-none focus:ring-1 focus:ring-[#39a900]"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <select 
            className="bg-[#f8faf8] border-none rounded-xl px-4 py-2 text-[11px] font-bold text-gray-500 outline-none cursor-pointer"
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos los estados">Todos los estados</option>
            <option value="Registrada">Registrada</option>
            <option value="En revision">En revisión</option>
            <option value="En ajustes">En ajustes</option>
            <option value="Validada">Validada</option>
            <option value="Validada para envio">Validada para envío</option>
          </select>
          <select 
            className="bg-[#f8faf8] border-none rounded-xl px-4 py-2 text-[11px] font-bold text-gray-500 outline-none cursor-pointer"
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Capacitacion">Capacitación</option>
            <option value="Proyecto">Proyecto</option>
          </select>
        </div>
        <button 
          onClick={exportarData}
          className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-100 rounded-xl text-[11px] font-black text-gray-600 shadow-sm hover:bg-gray-50 transition-all active:scale-95"
        >
          <Download size={14} /> Exportar
        </button>
      </div>

      {/* TABLA DE SOLICITUDES */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="p-5">Numero</th>
              <th className="p-5">Solicitante</th>
              <th className="p-5">Tipo</th>
              <th className="p-5">Ubicacion</th>
              <th className="p-5">Fecha</th>
              <th className="p-5">Prioridad</th>
              <th className="p-5">Estado</th>
              <th className="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {solicitudesFiltradas.map((sol) => (
              <tr key={sol.id} className="hover:bg-gray-50/30 transition-colors group cursor-pointer">
                <td className="p-5 text-[11px] font-black text-gray-800">{sol.id}</td>
                <td className="p-5">
                  <p className="text-[11px] font-black text-gray-800 leading-none">{sol.solicitante}</p>
                  <span className="text-[8px] font-black text-gray-400 uppercase border border-gray-200 px-1.5 rounded mt-1.5 inline-block bg-white">{sol.tipoUsuario}</span>
                </td>
                <td className="p-5">
                   <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${sol.tipo === 'Proyecto' ? 'bg-purple-50 text-purple-400' : 'bg-orange-50 text-orange-400'}`}>
                         <FileText size={12}/>
                      </div>
                      <span className="text-[11px] font-bold text-gray-600">{sol.tipo}</span>
                   </div>
                </td>
                <td className="p-5">
                  <p className="text-[11px] font-bold text-gray-800 leading-none">{sol.ubicacion.split(',')[0]}</p>
                  <p className="text-[9px] text-gray-400">{sol.ubicacion.split(',')[1]}</p>
                </td>
                <td className="p-5 text-[11px] font-bold text-gray-400">{sol.fecha}</td>
                <td className="p-5">
                   <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      sol.prioridad === 'Alta' ? 'bg-red-50 text-red-500' : 
                      sol.prioridad === 'Media' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
                   }`}>
                      {sol.prioridad}
                   </span>
                </td>
                <td className="p-5">
                  <StatusBadge status={sol.estado} />
                </td>
                <td className="p-5 text-right">
                  <button className="p-2 hover:bg-white rounded-lg transition-all text-gray-300 hover:text-[#39a900] shadow-none hover:shadow-sm">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* FOOTER PAGINACIÓN */}
        <div className="p-5 bg-gray-50/30 border-t border-gray-50 flex justify-between items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Mostrando {solicitudesFiltradas.length} de {datos.length} solicitudes</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-400 flex items-center gap-1"><ChevronLeft size={14}/> Anterior</button>
            <button className="px-4 py-1.5 bg-white border border-gray-100 rounded-xl text-[10px] font-black text-gray-800 flex items-center gap-1">Siguiente <ChevronRight size={14}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTES ---
const StatCard = ({ label, value, color = "text-gray-800" }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all group">
    <p className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest group-hover:text-[#39a900] transition-colors">{label}</p>
    <p className={`text-4xl font-black ${color} tracking-tighter leading-none`}>{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    'Registrada': 'bg-gray-100 text-gray-500 border-gray-200',
    'En revision': 'bg-blue-50 text-blue-500 border-blue-100',
    'En ajustes': 'bg-red-50 text-red-400 border-red-100',
    'Validada': 'bg-green-50 text-green-500 border-green-100',
    'Validada para envio': 'bg-[#39a900] text-white border-[#39a900]',
  };
  return (
    <div className={`px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-tight flex items-center gap-1.5 w-fit ${styles[status]}`}>
      {status === 'Validada para envio' && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-sm" />}
      {status}
    </div>
  );
};

export default Solicitudes;