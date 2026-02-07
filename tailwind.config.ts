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
        // Shadcn-compatible tokens
        foreground: "#333333",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#333333",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#595959",
        },
        accent: {
          DEFAULT: "#F9F9F9",
          foreground: "#333333",
        },
        secondary: {
          DEFAULT: "#F5F5F5",
          foreground: "#333333",
        },
        background: "#FFFFFF",
        border: "#E0E0E0",
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        input: "#E0E0E0",
        ring: "#FFC300",
        // Portfolio Pulse Dashboard Colors
        portfolio: {
          // Align Portfolio Pulse with landing page palette
          primary: "#FFC300",       // Gold - primary actions
          "primary-dark": "#FFD700",
          "primary-light": "#FFE066",
          bg: "#F5F5F5",            // Light Grey - page backgrounds
          card: "#FFFFFF",          // White - cards
          border: "#E0E0E0",        // Border color
          text: "#333333",          // Dark text
          "text-muted": "#595959",  // Muted text
          // Semantic colors (match landing page status colors)
          growth: "#16b364",
          "growth-light": "#DCFCE7",
          risk: "#DC2626",
          "risk-light": "#FEE2E2",
          stable: "#F59E0B",
          "stable-light": "#FEF3C7",
        },
        // Primary Colors (existing)
        primary: {
          DEFAULT: "#FFC300",
          dark: "#FFD700",
          light: "#FFE066",
          lighter: "#FFF3B0",
          tint: "#FFF9DB",
          bg: "#FFFCEE",
          foreground: "#000000",
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
        inter: ["Inter", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      borderRadius: {
        "portfolio": "10px",
        "portfolio-sm": "8px",
      },
      boxShadow: {
        "portfolio-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "portfolio": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        "portfolio-md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "portfolio-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
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
