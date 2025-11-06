/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
      colors: {
        // 🌑 Backgrounds & Surfaces
        background: "#02071E", // page background
        surface: "#0b1131", // card, section, modal, etc.
        surfaceAlt: "#7385BE", // lighter surface for contrast

        // 🌈 Brand & brand
        brand: "#FEF08A", // main brand color
        brandDark: "#EAB308", // hover/dark variant
        accent: "#FACC15", // secondary highlight

        // 💬 Text
        text: {
          primary: "#ffffff", // main text
          secondary: colors.gray[300], // muted text
          inverse: "#111827", // on dark backgrounds
        },

        // 💡 States & Utility
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
        border: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
