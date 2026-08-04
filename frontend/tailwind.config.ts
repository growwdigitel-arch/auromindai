import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#111111",
        card: {
          DEFAULT: "#FAFAFA",
          foreground: "#111111",
        },
        primary: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#16A34A",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#22C55E",
          light: "#DCFCE7",
          foreground: "#FFFFFF",
        },
        border: "#E5E7EB",
        muted: {
          DEFAULT: "#F4F4F5",
          foreground: "#71717A",
        },
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.04)",
        floating: "0 12px 32px -8px rgba(0, 0, 0, 0.08)",
        glow: "0 0 20px 2px rgba(34, 197, 94, 0.2)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
