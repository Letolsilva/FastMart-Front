/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#380650",
        secondary: "#683299",
        third: "#a855f7"
      },
    },
  },
  plugins: [],
};
