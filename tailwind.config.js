/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salta: {
          red: '#8B0000',     // Rojo Poncho Salteño
          earth: '#C27A4E',   // Marrón Arcilla / Valles
          sand: '#E6D7C3',    // Tono Cerros
          sky: '#1E3A8A',     // Azul Cielo Pungeño
        }
      }
    },
  },
  plugins: [],
}