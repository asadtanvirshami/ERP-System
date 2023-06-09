/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    "custom-red": {
      500: "#ED213A",
      700: "#93291E",
    },
    theme: {
      700: "#2c3138",
    },
    hover: {
      700: "1e1e1e",
    },
  },
};

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [],
  theme: {
    fontFamily: {
      display: ["Oswald"],
      body: ["Montserrat"],
    },
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
      translate: {
        200: '200%',
    },
    },
    colors: colors,
  },
});
