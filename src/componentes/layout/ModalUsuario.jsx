import React, { useEffect, useState } from 'react';
import { X, User, Fingerprint, Shield, Mail } from 'lucide-react';

const ModalUsuario = ({ isOpen, onClose, usuario, alGuardar }) => {
  const [formData, setFormData] = useState({ 
    nombre: '', 
    documento: '', 
    rol: 'Campesino',
    email: '' 
  });

  useEffect(() => {
    if (usuario) {
      setFormData({ 
        nombre: usuario.nombre, 
        documento: usuario.documento, 
        rol: usuario.rol,
        email: usuario.email || '' 
      });
    } else {
      setFormData({ nombre: '', documento: '', rol: 'Campesino', email: '' });
    }
  }, [usuario, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
        
       
        <div className="bg-[#042b18] p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-[#39a900]" />
            <h3 className="font-bold tracking-tight uppercase">
              {usuario ? 'Modificar Usuario' : 'Registrar Nuevo'}
            </h3>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24}/>
          </button>
        </div>
        
        <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); alGuardar(formData); }}>
          
          
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-wider">
              <User size={14} /> Nombre Completo
            </label>
            <input 
              type="text" required
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-[#39a900] bg-gray-50/50"
              placeholder="Ej: Juan Perez"
            />
          </div>

          
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-wider">
              <Fingerprint size={14} /> Número de Documento
            </label>
            <input 
              type="text" required
              value={formData.documento}
              onChange={(e) => setFormData({...formData, documento: e.target.value})}
              className="w-full p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-[#39a900] bg-gray-50/50 font-mono"
              placeholder="1061234567"
            />
          </div>

         
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-wider">
              <Mail size={14} /> Correo Electrónico
            </label>
            <input 
              type="email" required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-[#39a900] bg-gray-50/50"
              placeholder="usuario@sena.edu.co"
            />
          </div>

          
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-wider">
              <Shield size={14} /> Seleccionar Rol
            </label>
            <select 
              value={formData.rol}
              onChange={(e) => setFormData({...formData, rol: e.target.value})}
              className="w-full p-3 border-2 border-gray-100 rounded-xl bg-white outline-none focus:border-[#39a900] font-bold text-gray-700 cursor-pointer"
            >
              <option value="Campesino">Campesino</option>
              <option value="Asociación">Asociación</option>
              <option value="Gestor">Gestor</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-[#042b18] text-white rounded-xl font-bold shadow-lg hover:bg-[#39a900] transition-all uppercase text-sm tracking-widest"
            >
              {usuario ? 'ACTUALIZAR' : 'GUARDAR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUsuario;