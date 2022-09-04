/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'tablet': {'max': '991px'},
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}