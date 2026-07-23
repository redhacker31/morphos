import type { WidgetMetadata, WidgetRegistryEntry } from "../types/renderer";

/**
 * WidgetRegistry - Central Type-Safe Singleton Registry for MorphOS Presentational Widgets.
 */
export class WidgetRegistry {
  private static instance: WidgetRegistry;
  private registry = new Map<string, WidgetRegistryEntry<any>>();

  private constructor() {}

  public static getInstance(): WidgetRegistry {
    if (!WidgetRegistry.instance) {
      WidgetRegistry.instance = new WidgetRegistry();
    }
    return WidgetRegistry.instance;
  }

  public register(entry: WidgetRegistryEntry<any>): void {
    this.registry.set(entry.metadata.type, entry);
  }

  public get(type: string): WidgetRegistryEntry<any> | undefined {
    return this.registry.get(type);
  }

  public has(type: string): boolean {
    return this.registry.has(type);
  }

  public list(): WidgetMetadata[] {
    return Array.from(this.registry.values()).map((entry) => entry.metadata);
  }

  public clear(): void {
    this.registry.clear();
  }
}
