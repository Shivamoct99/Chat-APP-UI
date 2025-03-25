/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1476ff",
        light: "#f9faff",
        // secondary: "#f3f5ff",
        secondary: "#e5e6e8",
      },
    },
    screens: {
      sm: { min: "100px", max: "599.9px" },
      // sm: { min: "200px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "600px", max: "1280px" },
      // md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      // lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      // xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
