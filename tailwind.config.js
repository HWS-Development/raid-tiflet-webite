/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // body font (optional)
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'],
        // add a "display" family so Tailwind generates the class `font-display`
        display: ['Fraunces', 'Cormorant Garamond', 'ui-serif', 'Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        brand: {
          terracotta: "#C94F44",
          terracottaDark: "#A43A34",
          ivory: "#F3EFE7",
          charcoal: "#2A2A2A",
          sage: "#C7D3C0",
          palm: "#204A3D",
          saffron: "#F2B705",
          safi: "#0C4A6E",
        },
      },
      boxShadow: {
        soft: "0 8px 24px rgba(20,20,20,.08)",
      },
    },
  },
  plugins: [],
};