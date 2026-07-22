import type { ThemeTokens } from "../types/renderer";

export const DARK_GLASS_THEME: ThemeTokens = {
  id: "dark-glass",
  name: "Dark Glassmorphism",
  colors: {
    background: "#09090B",
    surface: "#111118",
    surfaceElevated: "#18181F",
    primary: "#8B5CF6",
    secondary: "#06B6D4",
    accent: "#A855F7",
    border: "rgba(255, 255, 255, 0.1)",
    textPrimary: "#FAFAFA",
    textSecondary: "#A1A1AA",
    textMuted: "#71717A",
  },
  glass: {
    background: "rgba(15, 23, 42, 0.75)",
    border: "rgba(255, 255, 255, 0.12)",
    blur: "16px",
  },
};

export const HIGH_CONTRAST_LIGHT_THEME: ThemeTokens = {
  id: "high-contrast-light",
  name: "High Contrast Light",
  colors: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceElevated: "#F1F5F9",
    primary: "#6366F1",
    secondary: "#0EA5E9",
    accent: "#8B5CF6",
    border: "rgba(15, 23, 42, 0.15)",
    textPrimary: "#0F172A",
    textSecondary: "#334155",
    textMuted: "#64748B",
  },
  glass: {
    background: "rgba(255, 255, 255, 0.85)",
    border: "rgba(15, 23, 42, 0.1)",
    blur: "12px",
  },
};

export const CYBERPUNK_NEON_THEME: ThemeTokens = {
  id: "cyberpunk-neon",
  name: "Cyberpunk Neon",
  colors: {
    background: "#05050A",
    surface: "#0D0D1A",
    surfaceElevated: "#14142B",
    primary: "#00F0FF",
    secondary: "#FF007A",
    accent: "#FFE600",
    border: "rgba(0, 240, 255, 0.2)",
    textPrimary: "#FFFFFF",
    textSecondary: "#8A8AA3",
    textMuted: "#52526B",
  },
  glass: {
    background: "rgba(13, 13, 26, 0.85)",
    border: "rgba(0, 240, 255, 0.3)",
    blur: "20px",
  },
};

export const THEME_PRESETS: Record<string, ThemeTokens> = {
  "dark-glass": DARK_GLASS_THEME,
  "high-contrast-light": HIGH_CONTRAST_LIGHT_THEME,
  "cyberpunk-neon": CYBERPUNK_NEON_THEME,
};
