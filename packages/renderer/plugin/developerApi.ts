import { WidgetRegistry } from "../registry/widgetRegistry";
import { ASTValidator } from "../schema/astValidator";
import { THEME_PRESETS } from "../theme/themePresets";
import type { WidgetRegistryEntry, ThemeTokens } from "../types/renderer";

/**
 * MorphOS Renderer Developer API
 * Canonical API functions exposed for external plugin developers and future marketplace additions.
 */
export function registerWidget<TProps = any>(entry: WidgetRegistryEntry<TProps>): void {
  WidgetRegistry.getInstance().register(entry);
}

export function registerTheme(theme: ThemeTokens): void {
  THEME_PRESETS[theme.id] = theme;
}

export function resolveWidget(type: string): WidgetRegistryEntry | undefined {
  return WidgetRegistry.getInstance().get(type);
}

export function validateNode(rawAst: unknown) {
  return ASTValidator.validate(rawAst);
}
