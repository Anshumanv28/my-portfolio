import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#18191b",
        surface: "#222427",
        surface2: "#2a2c30",
        ink: "#eff0f1",
        muted: "#9c9ea3",
        accent: "#ff4a1f",
        accentInk: "#18191b",
        field1: "#eff0f1",
        field1Ink: "#18191b",
        field1Muted: "#6b6d72",
        field1Surface: "#e2e3e5",
      },
      fontFamily: {
        sans: [
          "Switzer",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        small: "var(--step-small)",
        body: "var(--step-body)",
        lead: "var(--step-lead)",
        head: "var(--step-head)",
      },
      maxWidth: {
        col: "560px",
        colNarrow: "520px",
      },
    },
  },
  plugins: [],
};
export default config;
