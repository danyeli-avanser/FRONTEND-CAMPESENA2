import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ModalUsuario from '../../componentes/layout/ModalUsuario';

const GestionUsuarios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usuarios = [
    { id: 1, nombre: 'Carlos Ruiz', documento: '10203040', rol: 'Campesino' },
    { id: 2, nombre: 'Ana Silva', documento: '52637485', rol: 'Administrador' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#39a900] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
        >
          <Plus size={20} /> Nuevo Usuario
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Documento</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{u.nombre}</td>
                <td className="p-4">{u.documento}</td>
                <td className="p-4 flex justify-center gap-4 text-gray-500">
                  <Edit size={18} className="cursor-pointer" />
                  <Trash2 size={18} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalUsuario isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GestionUsuarios;