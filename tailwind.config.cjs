const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#FFC700",
          50: "#FFEFB8",
          100: "#FFEBA3",
          200: "#FFE27A",
          300: "#FFD952",
          400: "#FFD029",
          500: "#FFC700",
          600: "#C79B00",
          700: "#8F6F00",
          800: "#574400",
          900: "#332808",
        },
        gray: { ...colors.neutral, 1000: "#111111" },
      },
      fontFamily: {
        sans: ["Albert SansVariable", ...defaultTheme.fontFamily.sans],
      },
    },
    transitionDuration: {
      DEFAULT: "300ms",
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.65, 0, 0.35, 1)",
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
