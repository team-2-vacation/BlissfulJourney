module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Roboto', 'sans-serif'],
      },
      colors: {
        blissfulBlue: {
          '100': '#0062e2',
          '200': '#0467ab',
          '300': '#071c2d',
        },
      },
    },
  },
  plugins: [],
};