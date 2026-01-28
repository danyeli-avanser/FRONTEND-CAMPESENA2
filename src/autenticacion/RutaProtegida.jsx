import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = () => {
  const isAuthenticated = localStorage.getItem('token_campesena'); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default RutaProtegida;