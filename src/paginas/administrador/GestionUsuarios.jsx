import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, Users, Search, 
  TrendingUp, UserMinus, UserCheck, Edit 
} from 'lucide-react';
import ModalUsuario from '../../componentes/layout/ModalUsuario';

const GestionUsuarios = () => {
  // --- 1. ESTADOS DE BÚSQUEDA Y FILTROS ---
  const [busquedaTabla, setBusquedaTabla] = useState(""); 
  const [busquedaDashboard, setBusquedaDashboard] = useState(""); // Filtro del buscador de arriba
  const [filtroRolRapido, setFiltroRolRapido] = useState("Todos");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // --- 2. DATOS DE EJEMPLO ---
  const [usuarios, setUsuarios] = useState([
    { id: "USR-001", nombre: 'Juan Carlos Mendez', documento: '1061234567', rol: 'Campesino', email: 'juan.mendez@email.com', telf: '3001234567', estado: 'Activo', acceso: '2026-01-15 10:30', iniciales: 'JM' },
    { id: "USR-002", nombre: 'Asociacion Cafe del Cauca', documento: '900123456-1', rol: 'Asociación', email: 'cafecauca@email.com', telf: '3109876543', estado: 'Inactivo', acceso: '2026-01-14 15:45', iniciales: 'AC' },
    { id: "USR-003", nombre: 'Maria Elena Rodriguez', documento: '1067654321', rol: 'Gestor', email: 'maria.rodriguez@sena.edu.co', telf: '3205551234', estado: 'Suspendido', acceso: '2026-01-15 09:15', iniciales: 'MR' },
    { id: "USR-004", nombre: 'Carlos Alberto Gomez', documento: '1068887777', rol: 'Administrador', email: 'carlos.gomez@sena.edu.co', telf: '3154447788', estado: 'Activo', acceso: '2026-01-15 08:00', iniciales: 'CG' },
  ]);

  // --- 3. LA ANTENA (Escuchar al buscador de arriba) ---
  useEffect(() => {
    const manejarBusquedaGlobal = (e) => {
      // Escucha el evento 'busquedaGlobal' que viene del Navbar
      setBusquedaDashboard(e.detail || "");
    };

    window.addEventListener('busquedaGlobal', manejarBusquedaGlobal);
    return () => window.removeEventListener('busquedaGlobal', manejarBusquedaGlobal);
  }, []);

  // --- 4. LÓGICA DE FILTRADO MAESTRA ---
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter(u => {
      // Filtro de Pestañas (Roles)
      const matchPestana = filtroRolRapido === "Todos" || u.rol.startsWith(filtroRolRapido.slice(0, -2));

      // Filtro de Texto (Combina buscador de arriba + buscador de tabla)
      const termino = (busquedaTabla + busquedaDashboard).toLowerCase();
      const matchTexto = 
        u.nombre.toLowerCase().includes(termino) || 
        u.documento.includes(termino) ||
        u.email.toLowerCase().includes(termino);

      return matchPestana && matchTexto;
    });
  }, [usuarios, busquedaTabla, busquedaDashboard, filtroRolRapido]);

  // --- 5. FUNCIONES DE ACCIÓN ---
  const abrirModalEdicion = (u) => {
    setUsuarioSeleccionado(u);
    setIsModalOpen(true);
  };

  const cambiarEstado = (id, nombre, estActual) => {
    const estados = ['Activo', 'Inactivo', 'Suspendido'];
    const nuevo = estados[(estados.indexOf(estActual) + 1) % estados.length];
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, estado: nuevo } : u));
  };

  const handleGuardar = (datos) => {
    if (usuarioSeleccionado) {
      setUsuarios(usuarios.map(u => u.id === usuarioSeleccionado.id ? { ...u, ...datos } : u));
    } else {
      const nuevo = { ...datos, id: `USR-00${usuarios.length + 1}`, estado: 'Activo', iniciales: datos.nombre.slice(0,2).toUpperCase() };
      setUsuarios([...usuarios, nuevo]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen space-y-6 font-sans">
      
      {/* INDICADORES (STATS) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Usuarios', val: usuarios.length, icon: <Users />, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Activos', val: usuarios.filter(u => u.estado === 'Activo').length, icon: <UserCheck />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'En Proceso', val: 12, icon: <TrendingUp />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Inactivos', val: usuarios.filter(u => u.estado !== 'Activo').length, icon: <UserMinus />, color: 'text-red-500', bg: 'bg-red-50' }
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`p-2 w-fit rounded-xl mb-3 ${card.bg} ${card.color}`}>{card.icon}</div>
            <h4 className="text-2xl font-black text-gray-800">{card.val}</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
          </div>
        ))}
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-6">
        
        {/* FILTROS Y BOTÓN NUEVO */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex bg-gray-100/50 p-1 rounded-xl border border-gray-100 overflow-x-auto scrollbar-hide">
            {['Todos', 'Campesinos', 'Asociaciones', 'Gestores', 'Admins'].map(f => (
              <button 
                key={f} 
                onClick={() => setFiltroRolRapido(f)} 
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filtroRolRapido === f ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button 
            onClick={() => { setUsuarioSeleccionado(null); setIsModalOpen(true); }}
            className="bg-[#39a900] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-black text-[11px] uppercase shadow-lg shadow-green-100 hover:bg-[#2d8500] transition-all active:scale-95"
          >
            <Plus size={18} /> Nuevo Usuario
          </button>
        </div>

        {/* BUSCADOR DE LA TABLA */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, documento o email..." 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#39a900]/20 transition-all"
            value={busquedaTabla}
            onChange={(e) => setBusquedaTabla(e.target.value)}
          />
        </div>

        {/* TABLA DE GESTIÓN */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                <th className="px-4 py-4">Usuario</th>
                <th className="px-4 py-4">Documento</th>
                <th className="px-4 py-4">Contacto</th>
                <th className="px-4 py-4">Tipo</th>
                <th className="px-4 py-4">Estado</th>
                <th className="px-4 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {usuariosFiltrados.map((u) => (
                <tr key={u.id} className="group hover:bg-gray-50/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#39a900]/10 text-[#39a900] flex items-center justify-center font-black border border-[#39a900]/20">
                        {u.iniciales}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">{u.nombre}</div>
                        <div className="text-[10px] text-gray-400 font-bold">{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-black text-gray-700">{u.documento}</td>
                  <td className="px-4 py-4">
                    <div className="text-xs text-gray-600 font-bold">{u.email}</div>
                    <div className="text-[10px] text-gray-400">{u.telf}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-500 border border-gray-100">
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => cambiarEstado(u.id, u.nombre, u.estado)}
                      className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase transition-all ${
                        u.estado === 'Activo' ? 'bg-green-50 text-green-600 border-green-100' : 
                        u.estado === 'Suspendido' ? 'bg-red-50 text-red-500 border-red-100' : 
                        'bg-gray-50 text-gray-400 border-gray-200'
                      }`}
                    >
                      {u.estado}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => abrirModalEdicion(u)} 
                      className="px-4 py-2 bg-[#39a900]/10 text-[#39a900] rounded-xl hover:bg-[#39a900] hover:text-white transition-all font-black text-[10px] uppercase border border-[#39a900]/20 flex items-center gap-2 mx-auto"
                    >
                      <Edit size={14} /> Editar
                    </button>
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
        alGuardar={handleGuardar} 
      />
    </div>
  );
};

export default GestionUsuarios;