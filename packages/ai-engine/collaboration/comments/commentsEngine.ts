import type { NodeComment } from "../types/collaboration";

/**
 * CommentsEngine - Manages review comment threads attached to AppSchemaAST node IDs.
 */
export class CommentsEngine {
  private comments: Map<string, NodeComment> = new Map();

  public addComment(
    nodeId: string,
    authorId: string,
    authorName: string,
    content: string,
    authorAvatar?: string
  ): NodeComment {
    const comment: NodeComment = {
      id: `cmt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      nodeId,
      authorId,
      authorName,
      authorAvatar,
      content,
      timestamp: new Date().toISOString(),
      resolved: false,
      replies: [],
    };
    this.comments.set(comment.id, comment);
    return comment;
  }

  public replyToComment(
    commentId: string,
    authorId: string,
    authorName: string,
    content: string
  ): boolean {
    const comment = this.comments.get(commentId);
    if (!comment) return false;

    comment.replies.push({
      id: `rpl-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      authorId,
      authorName,
      content,
      timestamp: new Date().toISOString(),
    });
    return true;
  }

  public resolveComment(commentId: string): boolean {
    const comment = this.comments.get(commentId);
    if (!comment) return false;
    comment.resolved = true;
    return true;
  }

  public getCommentsForNode(nodeId: string): NodeComment[] {
    return Array.from(this.comments.values()).filter((c) => c.nodeId === nodeId);
  }

  public getAllComments(): NodeComment[] {
    return Array.from(this.comments.values());
  }

  public deleteComment(commentId: string): boolean {
    return this.comments.delete(commentId);
  }
}
