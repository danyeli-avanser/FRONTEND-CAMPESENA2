import React, { useState } from 'react';
import { 
  History, Search, Filter, Download, 
  User, Calendar, ShieldCheck, Monitor, FileSpreadsheet 
} from 'lucide-react';

const Auditoria = () => {
  const [busqueda, setBusqueda] = useState("");
  const [moduloFiltro, setModuloFiltro] = useState("Todos");

  // Datos extendidos para probar los filtros
  const [logs] = useState([
    { id: 1, usuario: "Juan Carlos Mendez", rol: "Campesino", accion: "Inicio de Sesión", modulo: "Autenticación", fecha: "2024-01-15 10:30:15", ip: "192.168.1.45" },
    { id: 2, usuario: "Admin SENA", rol: "Administrador", accion: "Modificó Rol: Gestor", modulo: "Roles", fecha: "2024-01-15 09:12:05", ip: "10.0.0.5" },
    { id: 3, usuario: "Maria Elena Rodriguez", rol: "Gestor", accion: "Validó Solicitud #102", modulo: "Solicitudes", fecha: "2024-01-15 08:45:30", ip: "172.16.0.22" },
    { id: 4, usuario: "Carlos Alberto Gomez", rol: "Administrador", accion: "Creó Usuario: Pedro Páramo", modulo: "Usuarios", fecha: "2024-01-14 16:20:00", ip: "10.0.0.5" },
    { id: 5, usuario: "Pedro Páramo", rol: "Campesino", accion: "Subió Documento: RUT", modulo: "Solicitudes", fecha: "2024-01-14 14:10:00", ip: "186.12.33.10" },
  ]);

  // --- LÓGICA DE FILTRADO ---
  const logsFiltrados = logs.filter(log => {
    const coincideBusqueda = 
      log.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      log.accion.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideModulo = moduloFiltro === "Todos" || log.modulo === moduloFiltro;
    
    return coincideBusqueda && coincideModulo;
  });

  // --- LÓGICA DE EXPORTACIÓN A CSV ---
  const exportarCSV = () => {
    if (logsFiltrados.length === 0) return alert("No hay datos para exportar");

    const encabezados = ["ID", "Usuario", "Rol", "Accion", "Modulo", "Fecha", "IP"];
    const filas = logsFiltrados.map(l => [l.id, l.usuario, l.rol, l.accion, l.modulo, l.fecha, l.ip]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + [encabezados, ...filas].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `auditoria_campesena_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Notificación visual
    const evento = new CustomEvent('nueva-notificacion', { 
      detail: { id: Date.now(), texto: "Reporte CSV descargado", tipo: "info", hora: 'Ahora' } 
    });
    window.dispatchEvent(evento);
  };

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-black text-gray-800 tracking-tight uppercase">Auditoría del Sistema</h1>
          <p className="text-xs font-bold text-gray-400">Control total de movimientos</p>
        </div>
        <button 
          onClick={exportarCSV}
          className="flex items-center gap-2 bg-[#042b18] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-[#39a900] shadow-lg transition-all"
        >
          <FileSpreadsheet size={16} /> Exportar Excel (CSV)
        </button>
      </div>

      {/* FILTROS Y BUSCADOR */}
      <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o acción..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs outline-none focus:ring-2 focus:ring-[#39a900]/10"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-gray-400 uppercase ml-2">Módulo:</span>
          <select 
            className="bg-gray-50 border-none rounded-xl px-4 py-3 text-[10px] font-bold text-gray-500 outline-none cursor-pointer hover:bg-gray-100"
            value={moduloFiltro}
            onChange={(e) => setModuloFiltro(e.target.value)}
          >
            <option value="Todos">Todos los registros</option>
            <option value="Autenticación">Autenticación</option>
            <option value="Roles">Roles</option>
            <option value="Solicitudes">Solicitudes</option>
            <option value="Usuarios">Usuarios</option>
          </select>
        </div>

        <div className="ml-auto px-4 py-2 bg-green-50 rounded-xl border border-green-100">
          <span className="text-[10px] font-black text-green-600 uppercase">
            {logsFiltrados.length} Registros encontrados
          </span>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Usuario / Rol</th>
              <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Acción Realizada</th>
              <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Módulo</th>
              <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Fecha y Hora</th>
              <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {logsFiltrados.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-[#39a900] text-[11px] font-black border border-green-100">
                      {log.usuario.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-800">{log.usuario}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">{log.rol}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <p className="text-[11px] font-bold text-gray-600">{log.accion}</p>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
                    log.modulo === 'Roles' ? 'bg-purple-50 text-purple-600' : 
                    log.modulo === 'Usuarios' ? 'bg-blue-50 text-blue-600' : 
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {log.modulo}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold">{log.fecha}</span>
                  </div>
                </td>
                <td className="p-5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    {log.ip}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Auditoria;