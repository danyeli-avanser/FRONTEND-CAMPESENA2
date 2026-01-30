import React from 'react';
import { Shield, Settings, Users, Check } from 'lucide-react';

const RolesServicios = () => {
  const roles = [
    { nombre: 'Administrador', permisos: ['Todo el sistema', 'Gestión de usuarios', 'Reportes'] },
    { nombre: 'Campesino', permisos: ['Crear solicitudes', 'Ver seguimiento', 'Perfil'] },
    { nombre: 'Instructor/Evaluador', permisos: ['Ver solicitudes', 'Validar documentos', 'Visitas'] }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Roles y Servicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((rol) => (
          <div key={rol.nombre} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-[#39a900]">
              <Shield size={24} />
              <h2 className="font-bold text-lg text-gray-800">{rol.nombre}</h2>
            </div>
            <ul className="space-y-2">
              {rol.permisos.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-[#39a900]" /> {p}
                </li>
              ))}
            </ul>
            <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
              Editar Permisos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesServicios;