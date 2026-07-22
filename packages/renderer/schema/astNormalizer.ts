import type { AppASTPayload, WidgetASTNode } from "./astSchema";

/**
 * ASTNormalizer - Auto-corrects incomplete AST nodes and calculates fallback grid coordinates.
 */
export class ASTNormalizer {
  public static normalize(ast: AppASTPayload): AppASTPayload {
    const normalizedNodes = ast.nodes.map((node, index) =>
      ASTNormalizer.normalizeNode(node, index)
    );

    return {
      ...ast,
      nodes: normalizedNodes,
    };
  }

  private static normalizeNode(node: WidgetASTNode, index: number): WidgetASTNode {
    const defaultX = (index % 2) * 6;
    const defaultY = Math.floor(index / 2) * 4;

    return {
      ...node,
      title: node.title || node.props?.title || "Untitled Widget",
      description: node.description || node.props?.description || "",
      gridPosition: {
        x: node.gridPosition?.x ?? defaultX,
        y: node.gridPosition?.y ?? defaultY,
        w: node.gridPosition?.w ?? 6,
        h: node.gridPosition?.h ?? 4,
      },
      props: {
        title: node.props?.title || node.title || "Untitled Widget",
        description: node.props?.description || node.description || "",
        data: node.props?.data ?? [],
        config: node.props?.config ?? {},
      },
    };
  }
}
