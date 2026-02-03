import React, { useState } from 'react';
import { 
  Shield, Users, Search, Plus, Eye, Edit3, 
  Lock, X, Save, Trash2, CheckCircle2
} from 'lucide-react';

const RolesPermisos = () => {
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const CATALOGO_PERMISOS = {
    "Usuarios": ["usuarios.ver", "usuarios.crear", "usuarios.editar", "usuarios.eliminar"],
    "Solicitudes": ["solicitudes.ver", "solicitudes.revisar", "solicitudes.validar", "solicitudes.eliminar"],
    "Sistema": ["config.ver", "config.editar", "reportes.generar", "auditoria.ver"]
  };

  const [roles, setRoles] = useState([
    { id: "ROL-001", nombre: 'Administrador', descripcion: 'Acceso total al sistema y gestión de parámetros globales.', usuariosCount: 2, permisos: ["usuarios.ver", "usuarios.crear", "usuarios.editar", "usuarios.eliminar", "config.ver", "config.editar", "reportes.generar", "auditoria.ver"], tipo: 'Rol base' },
    { id: "ROL-002", nombre: 'Gestor SENA', descripcion: 'Encargado de la revisión técnica y validación de documentos.', usuariosCount: 12, permisos: ["solicitudes.ver", "solicitudes.revisar", "solicitudes.validar", "usuarios.ver"], tipo: 'Rol base' },
    { id: "ROL-003", nombre: 'Campesino', descripcion: 'Usuario básico para registro de solicitudes personales.', usuariosCount: 186, permisos: ["solicitudes.ver", "solicitudes.crear"], tipo: 'Rol base' },
  ]);

  const [formData, setFormData] = useState({ nombre: '', descripcion: '', permisos: [] });

  // --- FUNCIONALIDADES CORE ---
  const togglePermiso = (permiso) => {
    setFormData(prev => ({
      ...prev,
      permisos: prev.permisos.includes(permiso) ? prev.permisos.filter(p => p !== permiso) : [...prev.permisos, permiso]
    }));
  };

  const abrirCrear = () => {
    setRolSeleccionado(null);
    setFormData({ nombre: '', descripcion: '', permisos: [] });
    setModalAbierto(true);
  };

  const abrirEditar = (rol) => {
    setRolSeleccionado(rol);
    setFormData({ nombre: rol.nombre, descripcion: rol.descripcion, permisos: [...rol.permisos] });
    setModalAbierto(true);
  };

  const abrirVer = (rol) => {
    setRolSeleccionado(rol);
    setModalVer(true);
  };

  const guardarRol = (e) => {
    e.preventDefault();
    if (rolSeleccionado) {
      setRoles(roles.map(r => r.id === rolSeleccionado.id ? { ...r, ...formData } : r));
      enviarNotificacion(`${formData.nombre} actualizado`, "info");
    } else {
      const nuevo = { ...formData, id: `ROL-00${roles.length + 1}`, usuariosCount: 0, tipo: 'Personalizado' };
      setRoles([...roles, nuevo]);
      enviarNotificacion("Rol creado exitosamente", "registro");
    }
    setModalAbierto(false);
  };

  const eliminarRol = (id, nombre) => {
    if (window.confirm(`¿Seguro que quieres eliminar el rol ${nombre}?`)) {
      setRoles(roles.filter(r => r.id !== id));
      enviarNotificacion("Rol eliminado", "desactivar");
    }
  };

  const enviarNotificacion = (mensaje, tipo) => {
    const evento = new CustomEvent('nueva-notificacion', { 
      detail: { id: Date.now(), texto: mensaje, tipo, hora: 'Ahora' } 
    });
    window.dispatchEvent(evento);
  };

  const rolesFiltrados = roles.filter(r => r.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen space-y-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Roles y Permisos</h1>
          <p className="text-xs font-bold text-gray-400">Panel de Seguridad Campesena</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#39a900]/10 outline-none w-64 transition-all shadow-sm"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <button onClick={abrirCrear} className="bg-[#39a900] text-white px-5 py-2 rounded-xl flex items-center gap-2 font-black text-[11px] uppercase shadow-md hover:bg-[#2d8500] transition-all">
            <Plus size={16} /> Nuevo Rol
          </button>
        </div>
      </div>

      {/* GRILLA DE TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rolesFiltrados.map((rol) => (
          <div key={rol.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-4 relative group hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-green-50 rounded-2xl text-green-600 border border-green-100"><Shield size={28} /></div>
              <div className="flex-1 pr-10">
                <h3 className="text-lg font-black text-gray-800 leading-tight">{rol.nombre}</h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-1">{rol.descripcion}</p>
              </div>
              <button onClick={() => eliminarRol(rol.id, rol.nombre)} className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={18}/>
              </button>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button onClick={() => abrirVer(rol)} className="flex-1 py-2.5 bg-gray-50 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl text-[10px] font-black uppercase transition-all">Ver Detalles</button>
              <button onClick={() => abrirEditar(rol)} className="flex-1 py-2.5 bg-[#042b18] text-white rounded-xl text-[10px] font-black uppercase shadow-sm hover:bg-[#39a900] transition-all">Editar Rol</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: VER DETALLES */}
      {modalVer && rolSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3"><Shield className="text-[#39a900]" size={20} /><h3 className="font-black text-gray-800 uppercase text-xs tracking-widest">Ficha del Rol</h3></div>
              <button onClick={() => setModalVer(false)}><X size={24} className="text-gray-400" /></button>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-100">{rolSeleccionado.descripcion}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 text-center">
                  <p className="text-xl font-black text-gray-800">{rolSeleccionado.usuariosCount}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Usuarios</p>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-center">
                  <p className="text-xl font-black text-gray-800">{rolSeleccionado.permisos.length}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Permisos</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {rolSeleccionado.permisos.map((p, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 capitalize">{p.replace('.', ' ')}</span>
                ))}
              </div>
              <button onClick={() => setModalVer(false)} className="w-full py-4 bg-[#042b18] text-white rounded-2xl font-black uppercase text-xs hover:bg-[#39a900] transition-all">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR / CREAR CON CHECKBOXES */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#042b18] p-6 text-white flex justify-between items-center">
              <h3 className="font-black uppercase text-xs tracking-widest">{rolSeleccionado ? 'Editar Rol' : 'Nuevo Rol'}</h3>
              <button onClick={() => setModalAbierto(false)}><X size={24}/></button>
            </div>
            <form onSubmit={guardarRol} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input required className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm" placeholder="Nombre del Rol" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                <input required className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm" placeholder="Descripción" value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-6 bg-gray-50 p-6 rounded-[1.5rem] border border-gray-100">
                {Object.entries(CATALOGO_PERMISOS).map(([categoria, lista]) => (
                  <div key={categoria} className="space-y-3">
                    <h4 className="text-[11px] font-black text-[#39a900] uppercase border-b border-green-100 pb-1">{categoria}</h4>
                    {lista.map(permiso => (
                      <label key={permiso} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-[#39a900]" checked={formData.permisos.includes(permiso)} onChange={() => togglePermiso(permiso)} />
                        <span className="text-[10px] font-bold text-gray-500 capitalize">{permiso.split('.')[1]}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-3 font-black text-gray-400 uppercase text-[10px]">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-[#042b18] text-white rounded-2xl font-black uppercase text-[10px] hover:bg-[#39a900]">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermisos;