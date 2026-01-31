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
        'proimages-orange': '#FF6B35',
        'proimages-dark': '#1A1A1A',
        'proimages-gray': '#2D2D2D',
      },
    },
  },
  plugins: [],
};
export default config;
