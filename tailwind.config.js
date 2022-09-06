/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
    screens: {
      'absview': {'max': '1250px'},
      'tablet': {'max': '991px'},
      'mobile': {'max': '680px'},
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}