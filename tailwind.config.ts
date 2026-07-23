import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--text-primary)",
        },
        "card-border": "var(--card-border)",
        "card-border-hover": "var(--card-border-hover)",
        border: "var(--border)",
        glass: {
          DEFAULT: "var(--glass)",
          border: "var(--glass-border)",
        },
        input: "var(--border)",
        ring: "var(--primary)",
        foreground: "var(--text-primary)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          subtle: "var(--primary-subtle)",
          glow: "var(--primary-glow)",
          light: "var(--primary-light)",
          foreground: "var(--text-primary)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--background)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          subtle: "var(--accent-subtle)",
          foreground: "var(--text-primary)",
        },
        viz: {
          1: "var(--viz-1)",
          2: "var(--viz-2)",
          3: "var(--viz-3)",
          4: "var(--viz-4)",
          5: "var(--viz-5)",
          6: "var(--viz-6)",
        },
        success: {
          DEFAULT: "var(--success)",
          glow: "var(--success-glow)",
          foreground: "var(--background)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--background)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--text-primary)",
        },
        muted: {
          DEFAULT: "var(--text-muted)",
          foreground: "var(--text-muted)",
        },
        popover: {
          DEFAULT: "var(--surface-elevated)",
          foreground: "var(--text-primary)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(var(--shadow-color), 0.1)",
        medium: "0 8px 30px -4px rgba(var(--shadow-color), 0.15)",
        large: "0 12px 40px -6px rgba(var(--shadow-color), 0.2)",
        glass: "0 8px 32px 0 rgba(var(--shadow-color), 0.37)",
        "glow-purple": "0 0 20px rgba(var(--glow-purple), 0.4)",
        "glow-cyan": "0 0 20px rgba(var(--glow-cyan), 0.4)",
        "glow-success": "0 0 20px rgba(var(--glow-success), 0.4)",
        "glow-error": "0 0 20px rgba(var(--glow-error), 0.4)",
        "elev-1": "var(--elevation-1)",
        "elev-2": "var(--elevation-2)",
        "elev-3": "var(--elevation-3)",
        "elev-4": "var(--elevation-4)",
      },
      transitionTimingFunction: {
        elegant: "var(--ease-out)",
        smooth: "var(--ease-smooth)",
      },
      zIndex: {
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        fixed: "var(--z-fixed)",
        modalBackdrop: "var(--z-modalBackdrop)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
        toast: "var(--z-toast)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
