import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0d1b2e", 2: "#14263d", line: "#2a3d58" },
        silver: "#cfd6e0",
        cream: { DEFAULT: "#efe9de", deep: "#d9d2c4" },
        mute: "#8d9ab0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        wm: ["Syncopate", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
