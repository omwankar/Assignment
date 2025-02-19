/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      colors: {
        amazon: {
          DEFAULT: "#f0c14b", // Amazon Yellow
          foreground: "#131921", // Amazon Dark Blue
        },
        "amazon-light": {
          DEFAULT: "#f0c14b",
          hover: "#f7ca5d",
          active: "#e6b83b",
        },
        "amazon-dark": {
          DEFAULT: "#131921",
          hover: "#232f3e",
          active: "#0d1117",
        },
        "amazon-gray": {
          DEFAULT: "#e3e6e6",
          foreground: "#131921",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
