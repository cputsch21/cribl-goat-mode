import type { Config } from "tailwindcss";

// Palette extracted from cribl.io — ink navy, signature teal, goat gold.
// No orange, per the boss.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#020e1b",
          2: "#0a1c2e",
          3: "#15293d",
          4: "#22384e",
        },
        canvas: "#f5f8f9",
        surface: "#ffffff",
        line: "#e3eaee",
        mist: "#eef3f5",
        muted: "#5d6e79",
        faint: "#8da0ab",
        teal: {
          DEFAULT: "#00cccc",
          deep: "#0b8f8f",
          dark: "#076e6e",
          tint: "#ccf5f5",
          faint: "#ebfafa",
        },
        gold: {
          DEFAULT: "#ffcf00",
          soft: "#fff3bf",
          deep: "#7a6200",
        },
        danger: {
          DEFAULT: "#d6453a",
          tint: "#fdeeec",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(2,14,27,0.04), 0 6px 20px rgba(2,14,27,0.06)",
        lift: "0 2px 4px rgba(2,14,27,0.06), 0 12px 32px rgba(2,14,27,0.10)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
