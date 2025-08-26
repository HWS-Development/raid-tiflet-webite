/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "DM Sans",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
        display: [
          "Fraunces",
          "Cormorant Garamond",
          "ui-serif",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },

      // === Client palette (exact values) ===
      colors: {
        // Raw client colors
        chb: "#D6C4A8",       // Chambre (ivory foncé) → rooms-heavy backgrounds
        ec: "#F5EFE4",        // Espaces communs / rooftop (light cream) → paper/background
        fcd: "#C2634B",       // Façade (terracotta) → CTAs/accents
        greenDoor: "#93C694", // Pastel/mixed green for doors/windows → accents, borders, hovers
        olive: "#556B2F",     // Dark olive → footer / strong accents

        // Semantic tokens (use these in components when possible)
        surface: {
          DEFAULT: "#F5EFE4", // same as ec
          subtle: "#FBF8F1",
          rooms: "#D6C4A8",   // same as chb
        },
        accent: {
          terracotta: "#C2634B",     // same as fcd
          terracottaDark: "#A43A34", // deeper terracotta for hover
          terracottaLight: "#D87C66",
          green: "#93C694",          // same as greenDoor
          greenDeep: "#556B2F",      // same as olive
        },
        ink: {
          DEFAULT: "#2A2A2A",
          soft: "#4A4A4A",
          muted: "#6B6B6B",
        },

        // Previous brand tokens (kept for backwards compatibility)
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

      // Shadows & radii tuned for the artistic style
      boxShadow: {
        soft: "0 8px 24px rgba(20,20,20,.08), 0 2px 8px rgba(20,20,20,.05)",
        card: "0 12px 28px rgba(30,30,30,.10)",
        ring: "0 0 0 6px rgba(194,99,75,.10)", // terracotta glow
      },
      borderRadius: {
        blob: "28px",
        pill: "999px",
      },

      // Focus ring helpers aligned to palette
      ringColor: {
        terracotta: "#C2634B",
        greenDoor: "#93C694",
        olive: "#556B2F",
      },
    },
  },
  plugins: [],
};
