import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Record AST Patch Broadcast
export const broadcastPatch = mutation({
  args: {
    sessionId: v.string(),
    senderId: v.string(),
    patchOp: v.string(),
    patchData: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("astPatches", {
      sessionId: args.sessionId,
      senderId: args.senderId,
      patchOp: args.patchOp,
      patchData: args.patchData,
      timestamp: Date.now(),
    });
  },
});

// Real-Time Presence Heartbeat Update
export const updatePresence = mutation({
  args: {
    sessionId: v.string(),
    userId: v.string(),
    name: v.string(),
    color: v.string(),
    role: v.string(),
    selectedNodeId: v.union(v.string(), v.null()),
    cursor: v.union(v.object({ x: v.number(), y: v.number() }), v.null()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("presenceStates")
      .withIndex("by_session_user", (q) => q.eq("sessionId", args.sessionId).eq("userId", args.userId))
      .first();

    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        selectedNodeId: args.selectedNodeId,
        cursor: args.cursor,
        status: args.status,
        lastActive: now,
      });
    } else {
      await ctx.db.insert("presenceStates", {
        sessionId: args.sessionId,
        userId: args.userId,
        name: args.name,
        color: args.color,
        role: args.role,
        selectedNodeId: args.selectedNodeId,
        cursor: args.cursor,
        status: args.status,
        lastActive: now,
      });
    }
  },
});

// Query Real-Time Session Presence List
export const getSessionPresence = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("presenceStates")
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .collect();
  },
});
