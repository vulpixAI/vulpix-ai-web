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
        fadeIn: 'fadeIn 2s ease-in forwards',
        slideDown: 'slideDown 1.5s ease-out',
        wheelDown: 'wheelDown 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        wheelDown: {
          'to': {
            opacity: 0,
            top: '60px'
          }
        }
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}