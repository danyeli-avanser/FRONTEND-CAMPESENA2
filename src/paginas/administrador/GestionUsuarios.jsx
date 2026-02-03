import React, { useState, useMemo } from 'react';
import { 
  Plus, Users, Search, Download, MoreHorizontal, 
  ChevronDown, TrendingUp, UserMinus, UserCheck, Trash2, Edit 
} from 'lucide-react';
import ModalUsuario from '../../componentes/layout/ModalUsuario';

const GestionUsuarios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRolRapido, setFiltroRolRapido] = useState("Todos");
  const [filtroTipoDropdown, setFiltroTipoDropdown] = useState("Todos los tipos");
  const [menuAbierto, setMenuAbierto] = useState(null);

  const [usuarios, setUsuarios] = useState([
    { id: "USR-001", nombre: 'Juan Carlos Mendez', documento: '1061234567', rol: 'Campesino', email: 'juan.mendez@email.com', telf: '3001234567', estado: 'Activo', acceso: '2026-01-15 10:30', iniciales: 'JM' },
    { id: "USR-002", nombre: 'Asociacion Cafe del Cauca', documento: '900123456-1', rol: 'Asociación', email: 'cafecauca@email.com', telf: '3109876543', estado: 'Inactivo', acceso: '2026-01-14 15:45', iniciales: 'AC' },
    { id: "USR-003", nombre: 'Maria Elena Rodriguez', documento: '1067654321', rol: 'Gestor', email: 'maria.rodriguez@sena.edu.co', telf: '3205551234', estado: 'Suspendido', acceso: '2026-01-15 09:15', iniciales: 'MR' },
    { id: "USR-004", nombre: 'Carlos Alberto Gomez', documento: '1068887777', rol: 'Administrador', email: 'carlos.gomez@sena.edu.co', telf: '3154447788', estado: 'Activo', acceso: '2026-01-15 08:00', iniciales: 'CG' },
  ]);

  // Sistema de Notificaciones
  const enviarNotificacion = (mensaje, tipo) => {
    const evento = new CustomEvent('nueva-notificacion', { 
      detail: { id: Date.now(), texto: mensaje, tipo, hora: 'Ahora' } 
    });
    window.dispatchEvent(evento);
  };

  // Funcionalidad: Cambiar Estado (Activo -> Inactivo -> Suspendido)
  const cambiarEstado = (id, nombre, estadoActual) => {
    const estados = ['Activo', 'Inactivo', 'Suspendido'];
    const nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, estado: nuevoEstado } : u));
    enviarNotificacion(`${nombre} ahora está ${nuevoEstado}`, 'info');
  };

  // Funcionalidad: Eliminar Usuario
  const eliminarUsuario = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      setUsuarios(usuarios.filter(u => u.id !== id));
      enviarNotificacion(`Usuario ${nombre} eliminado`, 'desactivar');
    }
    setMenuAbierto(null);
  };

  // Funcionalidad: Exportar a CSV real
  const exportarCSV = () => {
    const encabezados = "ID,Nombre,Documento,Email,Rol,Estado\n";
    const datos = usuariosFiltrados.map(u => `${u.id},${u.nombre},${u.documento},${u.email},${u.rol},${u.estado}`).join("\n");
    const blob = new Blob([encabezados + datos], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios_campesena_${new Date().toLocaleDateString()}.csv`;
    a.click();
    enviarNotificacion("Archivo exportado correctamente", "registro");
  };

  const stats = useMemo(() => ({
    total: usuarios.length,
    activos: usuarios.filter(u => u.estado === 'Activo').length,
    inactivos: usuarios.filter(u => u.estado !== 'Activo').length,
  }), [usuarios]);

  const usuariosFiltrados = usuarios.filter(u => {
    const matchBusqueda = u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          u.documento.includes(busqueda) || 
                          u.email.toLowerCase().includes(busqueda.toLowerCase());
    const matchRolRapido = filtroRolRapido === "Todos" || u.rol.startsWith(filtroRolRapido.slice(0, -1));
    const matchTipoDropdown = filtroTipoDropdown === "Todos los tipos" || u.rol === filtroTipoDropdown;
    return matchBusqueda && matchRolRapido && matchTipoDropdown;
  });

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen space-y-6">
      
      {/* TARJETAS DE RESUMEN */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Usuarios', val: stats.total, sub: 'Registrados', icon: <Users />, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Usuarios Activos', val: stats.activos, sub: 'En línea', icon: <UserCheck />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Nuevos', val: 12, sub: 'Este mes', icon: <TrendingUp />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Inactivos/Susp.', val: stats.inactivos, sub: 'Fuera de servicio', icon: <UserMinus />, color: 'text-red-500', bg: 'bg-red-50' }
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>{card.icon}</div>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">{card.sub}</span>
            </div>
            <h4 className="text-2xl font-black text-gray-800">{card.val}</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase">{card.label}</p>
          </div>
        ))}
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-6">
        
        {/* FILTROS Y NUEVO */}
        <div className="flex justify-between items-center">
          <div className="flex bg-gray-100/50 p-1 rounded-xl border border-gray-100">
            {['Todos', 'Campesinos', 'Asociaciones', 'Gestores', 'Admins'].map(f => (
              <button key={f} onClick={() => setFiltroRolRapido(f)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filtroRolRapido === f ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{f}</button>
            ))}
          </div>
          <button onClick={() => {setUsuarioSeleccionado(null); setIsModalOpen(true);}} className="bg-[#39a900] text-white px-5 py-2 rounded-xl flex items-center gap-2 font-black text-[11px] uppercase shadow-md hover:bg-[#2d8500] transition-all">
            <Plus size={16} /> Nuevo Usuario
          </button>
        </div>

        {/* BARRA DE BÚSQUEDA Y EXPORTAR */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, documento o email..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#39a900]/10 outline-none transition-all"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          
          <select 
            value={filtroTipoDropdown}
            onChange={(e) => setFiltroTipoDropdown(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-500 outline-none cursor-pointer hover:bg-gray-50 transition-all"
          >
            <option value="Todos los tipos">Todos los tipos</option>
            <option value="Campesino">Campesino</option>
            <option value="Asociación">Asociación</option>
            <option value="Gestor">Gestor</option>
            <option value="Administrador">Administrador</option>
          </select>

          <button onClick={exportarCSV} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Download size={16} /> Exportar
          </button>
        </div>

        {/* TABLA */}
        <div className="overflow-visible">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-black uppercase tracking-[0.1em]">
                <th className="px-4 py-4">Usuario</th>
                <th className="px-4 py-4">Documento</th>
                <th className="px-4 py-4">Email / Contacto</th>
                <th className="px-4 py-4">Tipo</th>
                <th className="px-4 py-4">Estado</th>
                <th className="px-4 py-4">Último Acceso</th>
                <th className="px-4 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {usuariosFiltrados.map((u) => (
                <tr key={u.id} className="group hover:bg-gray-50/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xs font-black border border-orange-100 uppercase">{u.iniciales}</div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">{u.nombre}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-black text-gray-700">{u.documento}</td>
                  <td className="px-4 py-4">
                    <div className="text-xs text-gray-600 font-bold">{u.email}</div>
                    <div className="text-[10px] text-gray-400">{u.telf}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${u.rol === 'Administrador' ? 'bg-[#39a900] text-white border-[#39a900]' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>{u.rol}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div 
                      onClick={() => cambiarEstado(u.id, u.nombre, u.estado)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase cursor-pointer transition-all hover:scale-105 w-fit ${u.estado === 'Activo' ? 'bg-green-50 text-green-600 border-green-100' : u.estado === 'Suspendido' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-gray-50 text-gray-400 border-gray-200'}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${u.estado === 'Activo' ? 'bg-green-500' : u.estado === 'Suspendido' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                      {u.estado}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[11px] font-bold text-gray-400">{u.acceso}</td>
                  <td className="px-4 py-4 text-center relative">
                    <button 
                      onClick={() => setMenuAbierto(menuAbierto === u.id ? null : u.id)}
                      className="text-gray-300 hover:text-gray-600 p-2"
                    >
                      <MoreHorizontal size={18}/>
                    </button>
                    
                    {/* MENU DESPLEGABLE DE ACCIONES */}
                    {menuAbierto === u.id && (
                      <div className="absolute right-0 top-12 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-10 py-2">
                        <button onClick={() => {setUsuarioSeleccionado(u); setIsModalOpen(true); setMenuAbierto(null);}} className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                          <Edit size={14} className="text-blue-500" /> Editar
                        </button>
                        <button onClick={() => cambiarEstado(u.id, u.nombre, u.estado)} className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                          <UserCheck size={14} className="text-green-500" /> Cambiar Estado
                        </button>
                        <hr className="my-1 border-gray-50" />
                        <button onClick={() => eliminarUsuario(u.id, u.nombre)} className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2">
                          <Trash2 size={14} /> Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalUsuario 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        usuario={usuarioSeleccionado}
        alGuardar={(datos) => {
          if (usuarioSeleccionado) {
            setUsuarios(usuarios.map(u => u.id === usuarioSeleccionado.id ? { ...u, ...datos } : u));
            enviarNotificacion(`Usuario ${datos.nombre} actualizado`, 'info');
          } else {
            const nuevo = { ...datos, id: `USR-00${usuarios.length + 1}`, acceso: 'Nunca', iniciales: datos.nombre.substring(0,2).toUpperCase(), estado: 'Activo' };
            setUsuarios([...usuarios, nuevo]);
            enviarNotificacion(`Usuario ${datos.nombre} creado`, 'registro');
          }
          setIsModalOpen(false);
        }} 
      />
    </div>
  );
};

export default GestionUsuarios;