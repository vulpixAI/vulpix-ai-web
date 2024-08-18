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
      }
    },
  },
  plugins: [],
}