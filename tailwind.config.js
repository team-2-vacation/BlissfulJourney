/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Roboto', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}