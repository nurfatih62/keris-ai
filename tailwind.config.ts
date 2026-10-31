import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sepia: {
          50: "#fbf7ef",
          100: "#f5ecdc",
          200: "#e9d7b8",
          300: "#d9bb8c",
          400: "#c79a5e",
          500: "#b67f42",
          600: "#9a6535",
          700: "#7c4e2d",
          800: "#5d3a25",
          900: "#3d271a",
          950: "#26170f",
        },
        gold: {
          300: "#e8c67a",
          400: "#d9ad55",
          500: "#c4923a",
          600: "#a5742c",
        },
        ink: "#241a12",
        parchment: "#f7f1e5",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      boxShadow: {
        soft: "0 18px 40px -24px rgba(61, 39, 26, 0.45)",
      },
      backgroundImage: {
        "batik-grid":
          "radial-gradient(circle at 1px 1px, rgba(196, 146, 58, 0.18) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
