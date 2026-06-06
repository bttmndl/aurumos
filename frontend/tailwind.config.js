/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — also mirrored as CSS variables in index.css
        gold: {
          DEFAULT: "#d4af37",
          soft: "#e6c873",
          dim: "#a67c1a",
        },
        ink: {
          900: "#0e0f13",
          800: "#15161d",
          700: "#1b1d26",
          line: "#262833",
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
