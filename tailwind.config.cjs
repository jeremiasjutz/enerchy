const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "#FFFBFE",
        background: "#000000",
        accent: "#FFC700",
        gray: colors.neutral,
      },
      fontFamily: {
        "albert-sans": ["Albert Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
