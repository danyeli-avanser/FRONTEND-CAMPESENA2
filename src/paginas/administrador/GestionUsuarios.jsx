import { Search, Plus, Filter, Download } from 'lucide-react';

const GestionUsuarios = () => {
  const usuarios = [
    { id: 'USR-001', nombre: 'Juan Carlos Méndez', rol: 'Campesino', estado: 'Activo', fecha: '2024-01-15' },
    { id: 'USR-002', nombre: 'Asociación Café Cauca', rol: 'Asociación', estado: 'Activo', fecha: '2024-01-14' },
    { id: 'USR-003', nombre: 'María Elena Rodríguez', rol: 'Gestor', estado: 'Activo', fecha: '2024-01-13' },
  ];

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
          <p className="text-gray-500 text-sm">Administra los usuarios del sistema CampeSENA</p>
        </div>
        <button className="bg-[#39a900] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2e8800] transition-colors">
          <Plus size={20} /> Nuevo Usuario
        </button>
      </header>

      {/* Tarjetas de resumen rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-400 uppercase font-bold">Total Usuarios</p>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-400 uppercase font-bold">Activos</p>
          <p className="text-2xl font-bold text-green-600">1,089</p>
        </div>
      </div>

      {/* Filtros y Tabla */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Buscar por nombre o documento..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39a900]/20" />
          </div>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter size={18} /> Filtros
          </button>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Download size={18} /> Exportar
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Usuario</th>
              <th className="px-6 py-4 font-medium">Tipo</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium">Último Acceso</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {usuarios.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-800">{u.nombre}</p>
                  <p className="text-xs text-gray-400">{u.id}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    u.rol === 'Gestor' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {u.rol}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> {u.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{u.fecha}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#39a900] hover:underline font-medium">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionUsuarios;