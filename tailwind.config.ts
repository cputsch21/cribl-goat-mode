import type { Config } from "tailwindcss";

// Palette pulled from cribl.io's homepage: bright cyan CTAs, violet
// "AI Platform" highlight, dark teal-navy ink, cool white canvas.
// (Token names kept stable; `gold` now carries the cyan CTA / violet
// chip duties it had before the re-skin.)
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
          DEFAULT: "#0a2730",
          2: "#10333e",
          3: "#1a4350",
          4: "#265564",
        },
        canvas: "#f7fafb",
        surface: "#ffffff",
        line: "#e3edf0",
        mist: "#edf4f6",
        muted: "#587179",
        faint: "#8da4ac",
        teal: {
          DEFAULT: "#0ce5e5",
          deep: "#0a9ea4",
          dark: "#077077",
          tint: "#c9f8fa",
          faint: "#e9fcfd",
        },
        // Cyan for fills/on-dark accents; violet for soft chips + text.
        gold: {
          DEFAULT: "#0ce5e5",
          soft: "#e9e5fc",
          deep: "#5443d8",
        },
        violet: {
          DEFAULT: "#6c5ce7",
          deep: "#5443d8",
          dark: "#4333c0",
          soft: "#e9e5fc",
        },
        danger: {
          DEFAULT: "#d6453a",
          tint: "#fdeeec",
        },
        // Deal Command health signals: red (Missing) / amber (Weak) / green
        // (Strong). danger above carries the red; these two complete the set.
        warn: {
          DEFAULT: "#e0920a",
          soft: "#fbf1da",
          deep: "#a26605",
        },
        good: {
          DEFAULT: "#10b07e",
          soft: "#e4f6ef",
          deep: "#0a7d59",
        },
      },
      backgroundImage: {
        // The cribl.io hero gradient: aqua → periwinkle → lavender.
        cribl: "linear-gradient(115deg, #5beeed 0%, #92c0f7 48%, #ab8bf4 100%)",
        "cribl-soft":
          "linear-gradient(115deg, #e6fbfc 0%, #eaf1fe 50%, #f1eafd 100%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,39,48,0.04), 0 6px 20px rgba(10,39,48,0.06)",
        lift: "0 2px 4px rgba(10,39,48,0.06), 0 12px 32px rgba(10,39,48,0.10)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
