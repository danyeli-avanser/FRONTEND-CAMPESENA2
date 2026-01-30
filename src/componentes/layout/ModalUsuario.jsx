import React from 'react';

const ModalUsuario = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-[#00324d] p-4 text-white flex justify-between items-center">
          <h3 className="text-lg font-bold">Nuevo Usuario</h3>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-bold text-gray-700">Nombre</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#39a900] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Documento</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#39a900] outline-none" />
          </div>
          <div className="flex gap-2 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-200 rounded">Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-[#39a900] text-white rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUsuario;