import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#2b1d14", 2: "#382619", line: "#5a4230" },
        silver: "#f3ead9",
        oak: { DEFAULT: "#c08a50", dark: "#a8743f" },
        cream: { DEFAULT: "#f3ead9", deep: "#e2d3ba" },
        mute: "#b9a48c",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
        wm: ["Syncopate", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
