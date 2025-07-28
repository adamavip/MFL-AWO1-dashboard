/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        quicksand: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
