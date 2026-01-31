import React, { useState } from 'react';
import { Edit, UserCheck, UserX, Plus, Users } from 'lucide-react';
import ModalUsuario from '../../componentes/layout/ModalUsuario';

const GestionUsuarios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Carlos Ruiz', documento: '10203040', rol: 'Campesino', activo: true },
    { id: 2, nombre: 'Ana Silva', documento: '52637485', rol: 'Administrador', activo: true }
  ]);

  // FUNCIÓN PARA ENVIAR NOTIFICACIÓN A LA CAMPANITA
  const enviarNotificacion = (mensaje, tipo) => {
    const evento = new CustomEvent('nueva-notificacion', { 
      detail: { id: Date.now(), texto: mensaje, tipo, hora: 'Ahora' } 
    });
    window.dispatchEvent(evento);
  };

  const abrirModal = (u = null) => { setUsuarioSeleccionado(u); setIsModalOpen(true); };

  const toggleEstado = (id, nombre, estadoActual) => {
    const accion = estadoActual ? 'deshabilitar' : 'habilitar';
    
    if (window.confirm(`¿Está seguro de que desea ${accion} al usuario ${nombre}?`)) {
      setUsuarios(usuarios.map(u => u.id === id ? { ...u, activo: !u.activo } : u));
      
      // ESTO ACTUALIZA LA CAMPANA AUTOMÁTICAMENTE
      enviarNotificacion(
        `Usuario ${nombre} ha sido ${estadoActual ? 'deshabilitado' : 'habilitado'}`,
        estadoActual ? 'desactivar' : 'activar'
      );
    }
  };

  const guardarUsuario = (datos) => {
    if (usuarioSeleccionado) {
      setUsuarios(usuarios.map(u => u.id === usuarioSeleccionado.id ? { ...u, ...datos } : u));
      enviarNotificacion(`Datos de ${datos.nombre} actualizados`, 'info');
    } else {
      const nuevo = { id: Date.now(), ...datos, activo: true };
      setUsuarios([...usuarios, nuevo]);
      enviarNotificacion(`Nuevo usuario registrado: ${datos.nombre}`, 'registro');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-2 space-y-6">
      {/* Encabezado con Verde Oscuro [#042b18] */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 text-gray-800">
          <div className="bg-[#042b18]/10 p-2 rounded-lg text-[#042b18]"><Users size={24}/></div>
          <h2 className="text-xl font-bold uppercase tracking-tight">Gestión de Usuarios</h2>
        </div>
        <button onClick={() => abrirModal()} className="bg-[#042b18] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:scale-105 transition-all">
          <Plus size={20} /> Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#042b18] text-white uppercase text-[11px] tracking-widest font-black">
            <tr>
              <th className="px-6 py-4">Nombre Completo</th>
              <th className="px-6 py-4">Documento</th>
              <th className="px-6 py-4">Tipo de Usuario</th>
              <th className="px-6 py-4 text-center">Gestión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usuarios.map((u) => (
              <tr key={u.id} className={`transition-all ${!u.activo ? 'bg-gray-50 opacity-70' : 'hover:bg-gray-50/80'}`}>
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-700">{u.nombre}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`w-2 h-2 rounded-full ${u.activo ? 'bg-[#39a900]' : 'bg-red-500'}`}></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{u.activo ? 'Activo' : 'Inactivo'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 font-mono">{u.documento}</td>
                <td className="px-6 py-4 text-[10px] font-black uppercase text-gray-600">{u.rol}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <button onClick={() => abrirModal(u)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => toggleEstado(u.id, u.nombre, u.activo)} 
                      className={`p-2 rounded-lg transition-all shadow-sm ${u.activo ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-[#39a900] hover:bg-[#39a900] hover:text-white'}`}
                      title={u.activo ? 'Deshabilitar' : 'Habilitar'}
                    >
                      {u.activo ? <UserX size={16} /> : <UserCheck size={16} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalUsuario 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        usuario={usuarioSeleccionado}
        alGuardar={guardarUsuario}
      />
    </div>
  );
};

export default GestionUsuarios;