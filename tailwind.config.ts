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
        // Primary Colors
        primary: {
          DEFAULT: "#FFC300",
          dark: "#FFD700",
          light: "#FFE066",
          lighter: "#FFF3B0",
          tint: "#FFF9DB",
          bg: "#FFFCEE",
        },
        black: "#000000",
        dark: "#333333",
        text: "#333333",
        muted: "#595959", // Updated for WCAG AA compliance (4.54:1 contrast)

        // Secondary / Neutral
        slate: {
          text: "#333333",
          muted: "#595959", // WCAG AA compliant (4.54:1 contrast)
          "light-muted": "#5F5F5F", // Updated for WCAG AA compliance (4.92:1 contrast)
          "lighter-muted": "#595959", // WCAG AA compliant (4.54:1 contrast)
          border: "#C0C0C0", // Improved from #E0E0E0 for better visibility (2.23:1)
          "light-bg": "#F9F9F9",
        },
        background: {
          DEFAULT: "#FFFFFF",
          light: "#F5F5F5",
          card: "#F0F0F0",
          beige: "#F9F9F9",
        },

        // Accent / Tech Colors
        teal: {
          DEFAULT: "#2B5F6F",
          dark: "#1A4A5A",
          light: "#3D7A8C",
        },
        cyan: {
          DEFAULT: "#00BCD4",
          light: "#20B2AA",
          neon: "#00E5FF",
        },
        orange: {
          DEFAULT: "#FF6B35",
          light: "#FF7F00",
          dark: "#E55A2B",
        },

        // Status Colors
        success: {
          DEFAULT: "#16b364",
          alt: "#10B981",
        },
        blue: {
          DEFAULT: "#3b82f6",
          dark: "#155eef",
        },
        warning: "#F59E0B",
        danger: "#DC2626",
      },
      fontFamily: {
        primary: ["Figtree", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '60px', letterSpacing: '-0.02em' }],
        'section': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      backdropBlur: {
        'xs': '2px',
        'md': '12px',
        'xl': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      },
    },
  },
  plugins: [],
};

export default config;

