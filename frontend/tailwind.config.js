/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'black-to-purple': 'linear-gradient(to bottom, #000000, #b8a5ef)',
      },
    },
  },
  plugins: [],
};
