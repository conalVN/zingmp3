/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      height: {
        header: "70px",
        control: "90px",
      },
      width: {
        nav: "240px",
      },
      colors: {
        primary: "#d7d7d8",
        subtext: "#77737e",
        second: "#8b8791",
        active: "#9b4de0",
        number: "rgba(74,144,226,0)",
      },
      backgroundColor: {
        header: "rgba(23, 15, 35, 0.8)",
        sideLeft: "#221a2d",
        activeItemNav: "#393142",
        sideRight: "#120822",
        content: "#170f23",
        control: "#130c1c",
        line: "#393142",
        "layer-30": "rgba(0, 0, 0, 0.3)",
        "layer-50": "rgba(0, 0, 0, 0.5)",
        alpha: "hsla(0, 0%, 100%, 0.1)",
        "alpha-2": "rgba(255, 255, 255, .2)",
        "alpha-3": "",
        "alpha-banner": "rgba(23, 15, 35, .9)",
      },
      borderColor: {
        line: "#393142",
        active: "#9b4de0",
      },
      flex: {
        4: "1 1 40%",
        6: "1 1 60%",
      },
      fontFamily: {
        robo: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
