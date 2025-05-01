/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#02071E", // e.g., blue-800
        secondary: "#080D26", // e.g., amber-500
        accent: "#FEF08A", // e.g., emerald-500
        muted: "#169976", // e.g., gray-500
        backgroundLight: "#F9FAFB", // light background
        backgroundDark: "#222222", // dark background",
        surface: "#FFFFFF", // for cards, inputs, etc.
        error: "#EF4444", // red-500
        info: "#3B82F6", // blue-500
        success: "#22C55E", // green-500
        warning: "#FACC15", // yellow-400
      },
    },
  },
  plugins: [],
};
