/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores base del diseño
        beigePrimary: '#F5EADA',         // fondo superior
        background: '#F7F0E6',     // fondo principal
        sidebar: '#365369',       // sidebar oscuro
        panelCard: '#324454',       // panel o card
        text: '#111827',           // texto principal
        bgLabelText: '#FAF8F2',        //Fondo Label Texto
        colorLabelText: '#111827',    //Color Label Texto
        colorPlaceHolderText: '#71718E',    //Color PlaceHolder Texto
        focusLabelText: '#755D4D',    //Color Focus Label Texto
        muted: '#6B7280',          // texto secundario
        
        // Botones
        primary: '#147C74',        // botón principal teal
        primaryHover: '#0F6660',
        buttonTheme: '#B0745E',    // estilo alternativo
        buttonHoverTheme: '#935C49',
        confirm: '#1C8586',
        confirmHover: '#1F7477',

        // Otros
        shadowUpDown:  '0 -2px 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05)', // sombra para elementos elevados
        white: '#FFFFFF',
        urlText: '#238CD4',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'extra-intense': '0 8px 20px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}