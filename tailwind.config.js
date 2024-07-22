/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#380650",
        secondary: "#683299",
        third: "#a855f7",
      },
      keyframes: {
        pulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        shake: "shake 0.6s ease-in-out",
        pulse: "pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
