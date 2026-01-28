import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react'; // Cambiamos Mail por User

const IniciarSesion = () => {
  // 1. Estados para los datos de acceso
  const [identificacion, setIdentificacion] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // 2. Credenciales por Número de Identificación
  const CREDENCIALES_VALIDAS = {
    documento: '12345678', // Tu número de identificación
    password: 'admin'      // Tu contraseña
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    setTimeout(() => {
      // 3. Validación por identificación
      if (identificacion === CREDENCIALES_VALIDAS.documento && password === CREDENCIALES_VALIDAS.password) {
        localStorage.setItem('token_campesena', 'sesion_activa_id_' + identificacion);
        localStorage.setItem('usuario_nombre', 'Administrador SENA');
        
        setCargando(false);
        navigate('/admin/dashboard');
      } else {
        setCargando(false);
        setError('Número de identificación o contraseña incorrectos.');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="bg-[#052e16] p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-xl mx-auto flex items-center justify-center mb-4">
            <span className="text-[#052e16] text-3xl font-bold">S</span>
          </div>
          <h2 className="text-white text-2xl font-bold italic">CampeSENA</h2>
          <p className="text-gray-300 text-sm mt-2">Acceso con Documento de Identidad</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm rounded animate-pulse">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Número de Identificación</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                required
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#39a900] focus:border-transparent outline-none transition-all"
                placeholder="Ingrese su documento"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type={mostrarPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#39a900] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-[#39a900]"
              >
                {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={cargando}
            className="w-full bg-[#39a900] hover:bg-[#2e8800] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 disabled:opacity-70 active:scale-[0.98]"
          >
            {cargando ? <Loader2 className="animate-spin" size={20} /> : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;