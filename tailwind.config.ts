import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch design tokens — exact values
        "primary-container": "#e31b23",
        "surface-bright": "#3a3939",
        "on-surface-variant": "#e7bdb8",
        "on-error-container": "#ffdad6",
        "on-primary-container": "#fff9f8",
        primary: "#ffb4ac",
        "outline-variant": "#262626",
        "surface-container-low": "#111111",
        "surface-container": "#161616",
        "surface-container-high": "#202020",
        outline: "#1f1f1f",
        tertiary: "#8e8e93",
        secondary: "#a1a1aa",
        surface: "#0d0d0d",
        "surface-container-lowest": "#070707",
        "on-surface": "#f4f4f5",
        background: "#050505",
        // Accent shorthands
        accent: "#e31b23",
        "accent-hover": "#ff2d36",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.22em",
        "tighter-hero": "-0.05em",
      },
      keyframes: {
        "terminal-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(227,27,35,0.25)" },
          "50%": { boxShadow: "0 0 20px rgba(227,27,35,0.65)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "terminal-blink": "terminal-blink 1.05s infinite",
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      maxWidth: {
        "8xl": "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
