/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          terracotta: "#C94F44",      // warm, lively primary
          terracottaDark: "#8A352D",  // hover state
          ivory: "#F6F1EB",           // clean background (patio contrast)
          charcoal: "#1F2937",        // strong text color
          // subtle accents reflecting rooms (used very lightly)
          green: "#2F8F5B",
          blue: "#1E5A8A",
          yellow: "#F2B705",
          crimson: "#B7322C"
        }
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.15)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      }
    },
  },
  plugins: [],
}
