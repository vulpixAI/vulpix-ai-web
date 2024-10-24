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
        'white-gray': '#c3d1dc',
        'blue-gray': '#c5d2c2',
        'dark-gray': "#222222"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in forwards',
        slideDown: 'slideDown 1.5s ease-out',
        moveArrow: 'moveArrow 1.5s ease-in-out infinite',
        indeterminateProgressBar: 'indeterminateProgressBar 1.8s infinite'
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
        moveArrow: {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' }
        },
        indeterminateProgressBar: {
          from: { left: '-50%' },
          to: { left: '100%' }
        }
      },
      backgroundImage: {
        'header': "linear-gradient(to right, rgba(22, 23, 25, 0.84), rgba(22, 23, 25, 0.84)), url('/bg-header.jpg')",
        'fade': "url('/fade.svg')",
        'login': "url('/bg-login.jpg')",
        'signup': "url('/bg-signup.jpg')"
      },
      screens: {
        'mobile': { 'max': '1000px' }
      },
      clipPath: {
        login: "polygon(0% 0%, 0% 100%, 84% 100%, 100% 0%)",
        signup: "polygon(100% 0%, 100% 100%, 20% 100%, 0% 0%)"
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-clip-path")
  ],
}