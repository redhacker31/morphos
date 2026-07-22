import type { ThemeTokens } from "../types/renderer";
import { THEME_PRESETS, DARK_GLASS_THEME } from "./themePresets";

/**
 * ThemeEngine - Resolves theme presets and applies CSS variable overrides to document or widget scope.
 */
export class ThemeEngine {
  public static getTheme(themeId: string): ThemeTokens {
    return THEME_PRESETS[themeId] || DARK_GLASS_THEME;
  }

  public static applyThemeToElement(element: HTMLElement, theme: ThemeTokens): void {
    element.style.setProperty("--background", theme.colors.background);
    element.style.setProperty("--surface", theme.colors.surface);
    element.style.setProperty("--surface-elevated", theme.colors.surfaceElevated);
    element.style.setProperty("--primary", theme.colors.primary);
    element.style.setProperty("--secondary", theme.colors.secondary);
    element.style.setProperty("--accent", theme.colors.accent);
    element.style.setProperty("--border", theme.colors.border);
    element.style.setProperty("--text-primary", theme.colors.textPrimary);
    element.style.setProperty("--text-secondary", theme.colors.textSecondary);
    element.style.setProperty("--text-muted", theme.colors.textMuted);
    element.style.setProperty("--glass", theme.glass.background);
    element.style.setProperty("--glass-border", theme.glass.border);
  }
}
