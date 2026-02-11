import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'], // Importante para o teu botão de tema
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        danger: "var(--danger)",
      },
      fontFamily: {
        exo: ["var(--font-exo)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        audiowide: ["var(--font-audiowide)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;