import type { WidgetASTNode } from "../schema/astSchema";

export interface TraversalContext {
  depth: number;
  path: string;
  visitedIds: Set<string>;
}

/**
 * ASTTraversalEngine - Recursive Tree Walker with Depth & Circular Reference Protection.
 */
export class ASTTraversalEngine {
  private static MAX_DEPTH = 16;

  public static traverse(
    node: WidgetASTNode,
    callback: (node: WidgetASTNode, ctx: TraversalContext) => void,
    parentCtx?: TraversalContext
  ): void {
    const currentDepth = (parentCtx?.depth ?? 0) + 1;

    if (currentDepth > ASTTraversalEngine.MAX_DEPTH) {
      console.warn(`[ASTTraversalEngine] Max depth limit (${ASTTraversalEngine.MAX_DEPTH}) exceeded at node ${node.id}`);
      return;
    }

    const visited = parentCtx?.visitedIds ? new Set(parentCtx.visitedIds) : new Set<string>();

    if (visited.has(node.id)) {
      console.error(`[ASTTraversalEngine] Circular reference detected at node ${node.id}`);
      return;
    }

    visited.add(node.id);

    const currentPath = parentCtx ? `${parentCtx.path}/${node.id}` : `/${node.id}`;
    const ctx: TraversalContext = {
      depth: currentDepth,
      path: currentPath,
      visitedIds: visited,
    };

    callback(node, ctx);

    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        ASTTraversalEngine.traverse(child, callback, ctx);
      }
    }
  }
}
