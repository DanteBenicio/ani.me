/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        blue: '#00A3FF',
        dark: {
          200: '#151B26',
          300: '#06090F'
        },
        gray: '#BFBFBF',
        white: {
          100: 'rgba(255, 255, 255, 0.05)',
          900: '#FFFFFF'
        }
      }
    }
  },
  plugins: []
}
