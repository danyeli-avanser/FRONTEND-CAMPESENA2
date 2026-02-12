import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import logoSena from '../assets/logoSena.png';

const IniciarSesion = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const CREDENCIALES_VALIDAS = {
    documento: '12345678', 
    password: 'admin'      
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    setTimeout(() => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* CABECERA */}
        <div className="bg-[#052e16] p-8 text-center">
          {/* Logo del SENA contenedor corregido */}
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-md overflow-hidden p-2">
            {logoSena ? (
              <img 
                src={logoSena} 
                alt="Logo SENA" 
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display = 'none'; }} // Evita icono de imagen rota
              />
            ) : (
              <span className="text-[#052e16] font-bold text-2xl">S</span>
            )}
          </div>
          <h2 className="text-white text-2xl font-bold italic tracking-tight">CampeSENA</h2>
          <p className="text-gray-300 text-xs mt-2 uppercase tracking-widest">BIENVENIDO</p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-xs rounded font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Documento de Identidad</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                required
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value.replace(/\D/g, ''))} // Solo permite números
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#39a900] focus:bg-white outline-none transition-all text-sm"
                placeholder="Ej: 12345678"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={mostrarPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#39a900] focus:bg-white outline-none transition-all text-sm"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#39a900] transition-colors"
              >
                {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={cargando}
            className="w-full bg-[#39a900] hover:bg-[#2e8800] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {cargando ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Validando...</span>
              </>
            ) : (
              "Ingresar al Sistema"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;