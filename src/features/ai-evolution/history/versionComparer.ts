import type { AppASTPayload } from "../../renderer/schema/astSchema";

export interface VersionDiffSummary {
  addedWidgets: string[];
  removedWidgets: string[];
  movedWidgets: string[];
  themeChanged: boolean;
  oldTheme: string;
  newTheme: string;
  layoutChanged: boolean;
  oldLayout: string;
  newLayout: string;
  propertyUpdates: string[];
}

/**
 * VersionComparer - Compares two AppASTPayload blueprints and highlights differences.
 */
export class VersionComparer {
  public static compare(oldAst: AppASTPayload, newAst: AppASTPayload): VersionDiffSummary {
    const oldNodes = oldAst.nodes || [];
    const newNodes = newAst.nodes || [];

    const oldIds = new Set(oldNodes.map((n) => n.id));
    const newIds = new Set(newNodes.map((n) => n.id));

    const addedWidgets: string[] = newNodes.filter((n) => !oldIds.has(n.id)).map((n) => n.props?.title || n.type);
    const removedWidgets: string[] = oldNodes.filter((n) => !newIds.has(n.id)).map((n) => n.props?.title || n.type);

    const movedWidgets: string[] = [];
    const propertyUpdates: string[] = [];

    for (const newNode of newNodes) {
      if (oldIds.has(newNode.id)) {
        const oldNode = oldNodes.find((n) => n.id === newNode.id)!;

        // Position change
        if (
          oldNode.gridPosition?.x !== newNode.gridPosition?.x ||
          oldNode.gridPosition?.y !== newNode.gridPosition?.y
        ) {
          movedWidgets.push(newNode.props?.title || newNode.type);
        }

        // Title property change
        if (oldNode.props?.title !== newNode.props?.title || oldNode.type !== newNode.type) {
          propertyUpdates.push(`Updated ${oldNode.type} to ${newNode.props?.title || newNode.type}`);
        }
      }
    }

    const themeChanged = oldAst.meta?.theme !== newAst.meta?.theme;
    const layoutChanged = oldAst.layout?.type !== newAst.layout?.type;

    return {
      addedWidgets,
      removedWidgets,
      movedWidgets,
      themeChanged,
      oldTheme: oldAst.meta?.theme || "dark-glass",
      newTheme: newAst.meta?.theme || "dark-glass",
      layoutChanged,
      oldLayout: oldAst.layout?.type || "dashboard",
      newLayout: newAst.layout?.type || "dashboard",
      propertyUpdates,
    };
  }
}
