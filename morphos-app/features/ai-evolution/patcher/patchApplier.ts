import type { AppASTPayload, WidgetASTNode } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation } from "../types/aiEvolution";
import { ASTNormalizer } from "../../renderer/schema/astNormalizer";

/**
 * PatchApplier - Applies atomic AST patch operations to an existing AppASTPayload.
 * Produces a fresh, immutable updated AppASTPayload blueprint.
 */
export class PatchApplier {
  public static applyPatches(ast: AppASTPayload, patches: ASTPatchOperation[]): AppASTPayload {
    let updatedNodes: WidgetASTNode[] = JSON.parse(JSON.stringify(ast.nodes || []));
    let updatedTheme = ast.meta?.theme || "dark-glass";
    let updatedLayout = JSON.parse(JSON.stringify(ast.layout || { type: "dashboard", columns: 12, gap: 16 }));
    let updatedMetaTitle = ast.meta?.title || "Application";
    let updatedMetaDesc = ast.meta?.description || "";

    for (const patch of patches) {
      if (patch.op === "UpdateTheme" && patch.newTheme) {
        updatedTheme = patch.newTheme;
      } else if (patch.op === "UpdateLayout" && patch.newLayout) {
        updatedLayout = patch.newLayout;
      } else if (patch.op === "InsertNode" && patch.node) {
        const insertIndex = typeof patch.position === "number" ? patch.position : updatedNodes.length;
        updatedNodes.splice(insertIndex, 0, patch.node);
      } else if (patch.op === "DeleteNode" && patch.targetNodeId) {
        updatedNodes = updatedNodes.filter((n) => n.id !== patch.targetNodeId);
      } else if (patch.op === "MoveNode" && patch.targetNodeId) {
        const index = updatedNodes.findIndex((n) => n.id === patch.targetNodeId);
        if (index !== -1) {
          const [moved] = updatedNodes.splice(index, 1);
          if (patch.gridPosition) {
            moved.gridPosition = patch.gridPosition;
          }
          const targetIndex = typeof patch.position === "number" ? patch.position : 0;
          updatedNodes.splice(targetIndex, 0, moved);
        }
      } else if (patch.op === "ReplaceWidget" && patch.targetNodeId && patch.replacementWidgetType) {
        const index = updatedNodes.findIndex((n) => n.id === patch.targetNodeId);
        if (index !== -1) {
          const oldNode = updatedNodes[index];
          const newTitle = `${patch.replacementWidgetType.toUpperCase().replace("-", " ")} Widget`;
          updatedNodes[index] = {
            id: oldNode.id,
            type: patch.replacementWidgetType,
            title: oldNode.title || newTitle,
            gridPosition: oldNode.gridPosition || { x: 0, y: 0, w: 12, h: 4 },
            props: {
              ...oldNode.props,
              title: oldNode.props?.title || newTitle,
              description: `Replaced widget type to ${patch.replacementWidgetType}`,
            },
          };
        }
      } else if (patch.op === "UpdateProps" && patch.targetNodeId && patch.props) {
        const index = updatedNodes.findIndex((n) => n.id === patch.targetNodeId);
        if (index !== -1) {
          updatedNodes[index] = {
            ...updatedNodes[index],
            props: {
              ...updatedNodes[index].props,
              ...patch.props,
            },
          };
        }
      } else if (patch.op === "RenameNode" && patch.targetNodeId && patch.newTitle) {
        const index = updatedNodes.findIndex((n) => n.id === patch.targetNodeId);
        if (index !== -1) {
          updatedNodes[index] = {
            ...updatedNodes[index],
            title: patch.newTitle,
            props: {
              ...updatedNodes[index].props,
              title: patch.newTitle,
            },
          };
        }
      }
    }

    const rawResult: AppASTPayload = {
      version: ast.version || "1.0.0",
      meta: {
        title: updatedMetaTitle,
        description: updatedMetaDesc,
        theme: updatedTheme,
      },
      layout: updatedLayout,
      nodes: updatedNodes.length > 0 ? updatedNodes : [
        {
          id: crypto.randomUUID(),
          type: "empty-state",
          gridPosition: { x: 0, y: 0, w: 12, h: 4 },
          props: {
            title: "Empty Workspace",
            description: "All nodes deleted. Add widgets to proceed.",
          },
        },
      ],
    };

    return ASTNormalizer.normalize(rawResult);
  }
}
