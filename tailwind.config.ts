import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111111",
        background: "#0A0A0A",
        "bg-secondary": "#151515",
        card: "#1C1C1C",
        border: "#2A2A2A",
        "text-primary": "#FFFFFF",
        "text-secondary": "#BDBDBD",
        accent: "#00E5A8",
        danger: "#FF5A5A",
        warning: "#FFC857",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};

export default config;
