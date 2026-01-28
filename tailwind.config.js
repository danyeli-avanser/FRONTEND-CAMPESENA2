/** @type {import('tailwindcss').Config} */
export default {
  // Asegúrate de que tenga el doble asterisco ** para entrar a subcarpetas
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}