const TOKEN_KEY = 'token_campesena';

export const eliminarToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  // También puedes limpiar cualquier otro dato del usuario si lo guardaste
  localStorage.clear(); 
};

export const obtenerToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};