/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        'black': '#161719',
        'gray': '#1b1c1e',
        'purple': '#5d5aff',
        'purple-dark': '#4947ca',
        'white-gray': '#c3d1dc'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        slideDown: 'slideDown 1.5s ease-out'
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}