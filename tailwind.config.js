/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8d1c5',
        secondary: '#eddcd2',
        accent: '#fff1e6',
        background: '#f0efeb',
        text: '#000000',
        textWhite: '#ffffff',
        header: '#eddcd2',
        hovertheme: '#334155',
        focustheme: '#334155',
        buttontheme: '#b0745e',
        buttonHoverTheme: '#935c49',
        formButtonConfirmationTheme: '#1c8586',
        formButtonConfirmationHoverTheme: '#1f7477',
        urlText: '#238cd4',
        Targets: '#334155'
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

