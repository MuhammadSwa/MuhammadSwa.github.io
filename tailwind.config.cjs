/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-bg": "#0f0f23",
        "dark-surface": "#161b2e",
        "dark-border": "#2a2f45",
        accent: "#64ffda",
        "accent-hover": "#4fd3b8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
