/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        surface: {
          canvas: '#0B0F19',
          sidebar: '#0F1420',
          column: '#141A28',
          card: '#192033',
          border: '#252E45',
        },
        feat: {
          bg: '#1e1b4b',
          text: '#a5b4fc',
          border: '#6366f1',
        },
        bug: {
          bg: '#831843',
          text: '#f472b6',
          border: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}