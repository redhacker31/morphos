import type { AppASTPayload } from "../../renderer/schema/astSchema";
import type { ASTPatchOperation, HistoryEntry } from "../types/aiEvolution";

/**
 * HistoryManager - Maintains chronological version history and AST patch logs.
 */
export class HistoryManager {
  private history: HistoryEntry[] = [];

  constructor(initialAst?: AppASTPayload) {
    if (initialAst) {
      this.recordVersion("Initial State", [], initialAst, ["Base application blueprint loaded"]);
    }
  }

  public recordVersion(
    prompt: string,
    patches: ASTPatchOperation[],
    ast: AppASTPayload,
    explanation: string[],
    author: string = "AI Evolution Engine"
  ): HistoryEntry {
    const entry: HistoryEntry = {
      versionId: `v-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      author,
      prompt,
      patchesApplied: patches,
      astSnapshot: JSON.parse(JSON.stringify(ast)),
      explanation,
    };
    this.history.push(entry);
    return entry;
  }

  public getHistory(): HistoryEntry[] {
    return [...this.history];
  }

  public getLatestEntry(): HistoryEntry | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }

  public getEntry(versionId: string): HistoryEntry | null {
    return this.history.find((e) => e.versionId === versionId) || null;
  }

  public clearHistory(): void {
    this.history = [];
  }
}
