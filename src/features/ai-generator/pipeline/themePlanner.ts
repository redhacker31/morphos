import type { ExtractedRequirements } from "../types/aiGenerator";

export interface ThemeConfig {
  theme: "dark-glass" | "high-contrast-light" | "cyberpunk-neon";
  glassStyle: string;
  spacing: string;
  colorPalette: string[];
}

/**
 * ThemePlanner - Selects visual theme, glass style, spacing, and color palettes.
 */
export class ThemePlanner {
  public static selectTheme(requirements: ExtractedRequirements): ThemeConfig {
    if (requirements.themePreference === "cyberpunk-neon" || requirements.domain === "financial-analytics") {
      return {
        theme: "cyberpunk-neon",
        glassStyle: "heavy-neon-glow",
        spacing: "compact",
        colorPalette: ["#00f0ff", "#ff007f", "#7928ca", "#00dfa2"],
      };
    }

    if (requirements.themePreference === "high-contrast-light") {
      return {
        theme: "high-contrast-light",
        glassStyle: "subtle-frosted",
        spacing: "relaxed",
        colorPalette: ["#0f172a", "#2563eb", "#059669", "#d97706"],
      };
    }

    return {
      theme: "dark-glass",
      glassStyle: "glassmorphic-dark",
      spacing: "comfortable",
      colorPalette: ["#6366f1", "#a855f7", "#ec4899", "#14b8a6"],
    };
  }
}
