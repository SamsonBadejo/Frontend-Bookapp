/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*"], // Ensure paths are correct
  darkMode: "class", // Enable dark mode based on a CSS class
  theme: {
    extend: {
      screens: {
        xs: "480px", // Extra small devices (portrait phones, less than 576px)
        sm: "640px", // Small devices (landscape phones, 576px and up)
        md: "768px", // Medium devices (tablets, 768px and up)
        lg: "1024px", // Large devices (desktops, 992px and up)
        xl: "1280px", // Extra large devices (large desktops, 1200px and up)
        "2xl": "1536px", // 2xl (extra extra large, 1536px and up)
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem", // Default padding
          sm: "3rem", // Padding for small screens and up
        },
      },
    },
  },
  plugins: [], // Add any required plugins here
});
