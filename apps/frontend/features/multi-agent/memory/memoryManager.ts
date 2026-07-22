import type { MemoryRecord } from "../types/multiAgent";

/**
 * MemoryManager - Manages long-term project memory, architecture decisions, user preferences, and patterns.
 */
export class MemoryManager {
  private records: MemoryRecord[] = [];

  public recordMemory(
    category: MemoryRecord["category"],
    content: string,
    tags: string[] = []
  ): MemoryRecord {
    const record: MemoryRecord = {
      id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      category,
      content,
      tags,
    };
    this.records.push(record);
    return record;
  }

  public getMemories(category?: MemoryRecord["category"]): MemoryRecord[] {
    if (category) {
      return this.records.filter((r) => r.category === category);
    }
    return [...this.records];
  }

  public searchByTag(tag: string): MemoryRecord[] {
    return this.records.filter((r) => r.tags.includes(tag));
  }
}
