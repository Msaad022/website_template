/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md2: "992px",
        lg2: "1200px",
      },
      colors: {
        'main-color': '#62bd5e',
      },
    },
  },
  plugins: [],
};
