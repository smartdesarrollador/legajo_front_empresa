/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        azul: "#5394cf",
        azul_claro: "#c6d8e7",
        celeste: "#34bceb",
        amarillo: "#ECCD50",
        celeste_claro: "#D8EAF4",
        gris_claro: "#ecf1f4",
        naranja: "#ff793f",
        naranja_claro: "#ffbea4",
        verde: "#4ac07b",
        verde_claro: "#e4f5ec",
        rojo: "#842315",
        rojo_claro: "#dea69e",
      },
      fontFamily: {
        test_fuente: ["Gloria Hallelujah", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "close-menu": "url('/assets/images/icons/icon-close.svg')",
        "open-menu": "url('/assets/images/icons/icon-hamburger.svg')",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("peer", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.peer + .${className} ~ .peer-checked:${separator}${className}`;
        });
      });
    },
  ],
};
