/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        serif: '"Baloo Bhaijaan 2"'
      },
      colors: {
        white: '#ffffff',
        blue: '#1a72b1',
        'flash-white': '#f2f2f2',
        'beau-blue': '#bad5e8',
        gold: '#FFD706',
        gray: '#F5F5F5',
        black: '#141414',
        'light-gray': '#828282'
      }
    }
  },
  plugins: []
};
