import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "pipeline-shimmer": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.45" },
        },
        "pipeline-flow": {
          "0%": { left: "0", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { left: "calc(100% - 0.25rem)", opacity: "0" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "70%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "pipeline-shimmer": "pipeline-shimmer 1.4s ease-in-out infinite",
        "pipeline-flow": "pipeline-flow 1.8s ease-in-out infinite",
        pop: "pop 0.35s ease-out 1 both",
      },
    },
  },
  plugins: [],
} satisfies Config;
