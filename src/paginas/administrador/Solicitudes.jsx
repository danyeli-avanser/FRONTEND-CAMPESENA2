import React, { useState, useMemo } from 'react';
import { 
  Search, Download, MoreHorizontal, FileText, 
  CheckCircle2, X, MapPin, Calendar, User, AlertCircle
} from 'lucide-react';

const Solicitudes = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos los estados");
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(false);

  // --- DATOS COMPLETOS (Reintegrados) ---
  const [datos, setDatos] = useState([
    { id: 'SOL-2024-001', solicitante: 'Juan Carlos Mendez', tipoUsuario: 'Campesino', tipo: 'Capacitacion', ubicacion: 'Popayan, Cauca', fecha: '2024-01-15', prioridad: 'Alta', estado: 'Registrada', gestor: 'Sin asignar' },
    { id: 'SOL-2024-002', solicitante: 'Asociacion Cafe del Cauca', tipoUsuario: 'Asociacion', tipo: 'Proyecto', ubicacion: 'Santander de Quilichao, Cauca', fecha: '2024-01-14', prioridad: 'Alta', estado: 'En revision', gestor: 'Maria Rodriguez' },
    { id: 'SOL-2024-003', solicitante: 'Maria Elena Rodriguez', tipoUsuario: 'Campesino', tipo: 'Proyecto', ubicacion: 'Piendamo, Cauca', fecha: '2024-01-13', prioridad: 'Media', estado: 'En ajustes', gestor: 'Carlos Gomez' },
    { id: 'SOL-2024-004', solicitante: 'Cooperativa Agro Norte', tipoUsuario: 'Asociacion', tipo: 'Capacitacion', ubicacion: 'Corinto, Cauca', fecha: '2024-01-12', prioridad: 'Baja', estado: 'Validada', gestor: 'Maria Rodriguez' },
    { id: 'SOL-2024-005', solicitante: 'Pedro Antonio Vargas', tipoUsuario: 'Campesino', tipo: 'Capacitacion', ubicacion: 'Timbio, Cauca', fecha: '2024-01-11', prioridad: 'Media', estado: 'Validada para envio', gestor: 'Carlos Gomez' },
  ]);

  // --- FUNCIÓN PARA DISPARAR NOTIFICACIONES AL SISTEMA ---
  const dispararNotificacionGlobal = (titulo, mensaje, tipo = 'info') => {
    const evento = new CustomEvent('nueva-notificacion', {
      detail: { id: Date.now(), titulo, mensaje, tipo, fecha: new Date().toLocaleTimeString() }
    });
    window.dispatchEvent(evento);
  };

  const actualizarSolicitud = (id, campo, valor) => {
    setDatos(prev => prev.map(sol => sol.id === id ? { ...sol, [campo]: valor } : sol));
    setMenuAbierto(null);
    
    // Generar notificación al cambiar estado
    if(campo === 'estado') {
      dispararNotificacionGlobal("Estado Actualizado", `La solicitud ${id} cambió a ${valor}`, "success");
    }
  };

  const solicitudesFiltradas = useMemo(() => {
    return datos.filter(sol => {
      const cumpleBusqueda = sol.solicitante.toLowerCase().includes(busqueda.toLowerCase()) || 
                             sol.id.toLowerCase().includes(busqueda.toLowerCase());
      const cumpleEstado = filtroEstado === "Todos los estados" || sol.estado === filtroEstado;
      return cumpleBusqueda && cumpleEstado;
    });
  }, [busqueda, filtroEstado, datos]);

  const exportarData = () => {
    const encabezados = "Numero,Solicitante,Tipo,Prioridad,Estado,Ubicacion,Gestor\n";
    const filas = solicitudesFiltradas.map(s => `${s.id},${s.solicitante},${s.tipo},${s.prioridad},${s.estado},${s.ubicacion},${s.gestor}`).join("\n");
    const blob = new Blob([encabezados + filas], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_Solicitudes.csv`;
    a.click();

    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 3000);
    dispararNotificacionGlobal("Reporte Generado", "Se exportaron las solicitudes a CSV", "info");
  };

  return (
    <div className="p-8 bg-[#f8faf8] min-h-screen font-sans relative">
      
      {/* TOAST DE ÉXITO LOCAL */}
      {mensajeExito && (
        <div className="fixed top-10 right-10 bg-white border-l-4 border-[#39a900] shadow-2xl rounded-xl p-4 flex items-center gap-4 z-[100] animate-in slide-in-from-right-full">
          <CheckCircle2 className="text-[#39a900]" size={20} />
          <p className="text-xs font-black text-gray-800 uppercase tracking-tighter">Archivo Descargado</p>
        </div>
      )}

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">Gestión de Solicitudes</h1>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Panel de control operativo</p>
      </div>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <StatCard label="Todas" value={datos.length} />
        <StatCard label="Registradas" value={datos.filter(s => s.estado === 'Registrada').length} />
        <StatCard label="En Ajustes" value={datos.filter(s => s.estado === 'En ajustes').length} color="text-red-500" />
        <StatCard label="Validadas" value={datos.filter(s => s.estado.includes('Validada')).length} color="text-[#39a900]" />
        <StatCard label="Alta Prioridad" value={datos.filter(s => s.prioridad === 'Alta').length} color="text-orange-600" />
      </div>

      {/* FILTROS */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-300" size={14} />
            <input 
              type="text" 
              placeholder="Buscar por solicitante, ID o municipio..." 
              className="pl-9 pr-4 py-2 bg-[#f8faf8] rounded-xl text-[11px] w-80 outline-none focus:ring-1 focus:ring-[#39a900]"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <select className="bg-[#f8faf8] rounded-xl px-4 py-2 text-[11px] font-bold text-gray-500 outline-none" onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="Todos los estados">Todos los estados</option>
            {['Registrada', 'En revision', 'En ajustes', 'Validada'].map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <button onClick={exportarData} className="flex items-center gap-2 px-5 py-2 bg-[#39a900] text-white rounded-xl text-[11px] font-black shadow-lg hover:bg-[#2d8500] transition-all">
          <Download size={14} /> Exportar CSV
        </button>
      </div>

      {/* TABLA COMPLETA */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-visible">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase border-b border-gray-100">
              <th className="p-5">Solicitante / Info</th>
              <th className="p-5">Ubicación</th>
              <th className="p-5">Gestor</th>
              <th className="p-5">Prioridad</th>
              <th className="p-5 text-center">Estado</th>
              <th className="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {solicitudesFiltradas.map((sol) => (
              <tr key={sol.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="p-5">
                  <p className="text-[11px] font-black text-gray-800">{sol.solicitante}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] font-black text-[#39a900] bg-green-50 px-1.5 py-0.5 rounded">{sol.id}</span>
                    <span className="text-[8px] font-bold text-gray-400 flex items-center gap-1"><Calendar size={10}/> {sol.fecha}</span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-gray-300" />
                    <div>
                      <p className="text-[10px] font-bold text-gray-700 leading-none">{sol.ubicacion.split(',')[0]}</p>
                      <p className="text-[8px] text-gray-400 mt-1">{sol.ubicacion.split(',')[1]}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400"><User size={12}/></div>
                    <span className="text-[10px] font-bold text-gray-600">{sol.gestor}</span>
                  </div>
                </td>
                <td className="p-5">
                   <PriorityBadge priority={sol.prioridad} />
                </td>
                <td className="p-5 text-center">
                  <StatusBadge status={sol.estado} />
                </td>
                <td className="p-5 text-right relative">
                  <button onClick={() => setMenuAbierto(menuAbierto === sol.id ? null : sol.id)} className="p-2 text-gray-300 hover:text-[#39a900]"><MoreHorizontal size={18} /></button>
                  {menuAbierto === sol.id && (
                    <div className="absolute right-5 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 py-3 animate-in zoom-in-95">
                      <p className="px-4 py-1 text-[9px] font-black text-gray-400 uppercase">Cambiar Prioridad</p>
                      <div className="flex gap-2 px-4 mb-3 mt-1">
                        {['Alta', 'Media', 'Baja'].map(p => (
                          <button key={p} onClick={() => actualizarSolicitud(sol.id, 'prioridad', p)} className="flex-1 py-1 rounded text-[8px] font-bold border hover:bg-gray-50">{p}</button>
                        ))}
                      </div>
                      <p className="px-4 py-1 text-[9px] font-black text-gray-400 uppercase border-t border-gray-50 pt-2">Flujo de Estado</p>
                      {['En revision', 'En ajustes', 'Validada para envio'].map(est => (
                        <button key={est} onClick={() => actualizarSolicitud(sol.id, 'estado', est)} className="w-full text-left px-4 py-2 text-[10px] font-bold text-gray-600 hover:bg-gray-50">Marcar como {est}</button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- COMPONENTES ---
const PriorityBadge = ({ priority }) => {
  const styles = { 'Alta': 'text-red-500 bg-red-50', 'Media': 'text-orange-500 bg-orange-50', 'Baja': 'text-blue-50 bg-blue-50' };
  return <span className={`px-2 py-1 rounded text-[9px] font-black border border-transparent ${styles[priority]}`}>{priority}</span>;
};

const StatusBadge = ({ status }) => {
  const styles = { 'Registrada': 'bg-gray-100 text-gray-500', 'En revision': 'bg-blue-50 text-blue-500', 'En ajustes': 'bg-red-50 text-red-500', 'Validada': 'bg-green-50 text-green-500', 'Validada para envio': 'bg-[#39a900] text-white' };
  return <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1.5 mx-auto w-fit ${styles[status]}`}>{status === 'Validada para envio' && <div className="w-1 h-1 bg-white rounded-full animate-pulse"/>}{status}</div>;
};

const StatCard = ({ label, value, color = "text-gray-800" }) => (
  <div className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm">
    <p className="text-[9px] font-black text-gray-400 uppercase mb-1">{label}</p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

export default Solicitudes;