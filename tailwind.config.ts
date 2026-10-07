import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "Tahoma", "system-ui", "sans-serif"],
      },
      colors: {
        void: "#0B0A14",
        ink: "#19182D",
        panel: "#14132A",
        panel2: "#1E1D38",
        line: "rgba(255,255,255,0.09)",
        mist: "#A9ADBB",
        afra: {
          magenta: "#E900D6",
          royal: "#2145FF",
          emerald: "#00E878",
          cyan: "#168EEA",
          gold: "#FFD42B",
          ember: "#FF8A28",
          flame: "#FF3026",
        },
        cream: "#F6F5F1",
        paper: "#FFFFFF",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(233,0,214,0.45)",
        "glow-blue": "0 0 40px -8px rgba(33,69,255,0.5)",
        "glow-green": "0 0 40px -8px rgba(0,232,120,0.4)",
        card: "0 24px 60px -24px rgba(0,0,0,0.55)",
      },
      backgroundImage: {
        "grad-magenta": "linear-gradient(135deg,#E900D6 0%,#2145FF 100%)",
        "grad-emerald": "linear-gradient(135deg,#00E878 0%,#168EEA 100%)",
        "grad-sunset": "linear-gradient(135deg,#FFD42B 0%,#FF8A28 55%,#FF3026 100%)",
        "grad-sheen": "linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.14) 50%,transparent 70%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-24px) scale(1.08)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.6)", opacity: "0.9" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.2,0.6,0.4,1) infinite",
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        shimmer: "shimmer 2.8s linear infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // Dark is the default theme; `light:` overrides apply under .light
      addVariant("light", ".light &");
    }),
  ],
};

export default config;
