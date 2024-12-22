/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        heading: ['"El Messiri"', "sans-serif"],
      },
      colors: {
        neutral: {
          black: "#0D0D0D",
          pink: "#EF73A6",
          green: "#66B07F",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
