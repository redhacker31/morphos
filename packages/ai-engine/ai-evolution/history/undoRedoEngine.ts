import type { AppASTPayload } from "../../renderer/schema/astSchema";

/**
 * UndoRedoEngine - Multi-step Undo & Redo Engine for AST blueprint states.
 */
export class UndoRedoEngine {
  private undoStack: AppASTPayload[] = [];
  private redoStack: AppASTPayload[] = [];

  constructor(initialAst?: AppASTPayload) {
    if (initialAst) {
      this.undoStack.push(JSON.parse(JSON.stringify(initialAst)));
    }
  }

  public pushState(ast: AppASTPayload): void {
    this.undoStack.push(JSON.parse(JSON.stringify(ast)));
    this.redoStack = []; // Clear redo stack on new operation
  }

  public canUndo(): boolean {
    return this.undoStack.length > 1;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  public undo(): AppASTPayload | null {
    if (!this.canUndo()) return null;
    const currentState = this.undoStack.pop()!;
    this.redoStack.push(currentState);
    return JSON.parse(JSON.stringify(this.undoStack[this.undoStack.length - 1]));
  }

  public redo(): AppASTPayload | null {
    if (!this.canRedo()) return null;
    const nextState = this.redoStack.pop()!;
    this.undoStack.push(nextState);
    return JSON.parse(JSON.stringify(nextState));
  }

  public getCurrentState(): AppASTPayload | null {
    return this.undoStack.length > 0 ? JSON.parse(JSON.stringify(this.undoStack[this.undoStack.length - 1])) : null;
  }
}
