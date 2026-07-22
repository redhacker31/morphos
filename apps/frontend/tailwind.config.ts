import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './engine/**/*.{js,ts,jsx,tsx,mdx}',
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
      spacing: {
        '2': 'var(--spacing-2)',
        '4': 'var(--spacing-4)',
        '8': 'var(--spacing-8)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
        '32': 'var(--spacing-32)',
        '40': 'var(--spacing-40)',
        '48': 'var(--spacing-48)',
        '64': 'var(--spacing-64)',
        '80': 'var(--spacing-80)',
        '96': 'var(--spacing-96)',
        '128': 'var(--spacing-128)',
      },
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--text-primary)",
        },
        border: "var(--border)",
        glass: {
          DEFAULT: "var(--glass)",
          border: "var(--glass-border)",
        },
        input: "var(--border)",
        ring: "var(--primary)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--text-primary)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--background)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--text-primary)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--background)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--background)",
        },
        destructive: {
          DEFAULT: "var(--error)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
