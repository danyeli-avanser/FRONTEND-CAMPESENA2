// src/api/autenticacion.api.js
import clienteAxios from './clienteAxios';

export const loginRequest = async (credenciales) => {
  return await clienteAxios.post('/auth/login', credenciales);
};

export const perfilRequest = async () => {
  return await clienteAxios.get('/auth/perfil');
};