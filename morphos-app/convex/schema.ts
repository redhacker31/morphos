import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Workspaces contain multiple applications & AST blueprints
  workspaces: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }),

  // Generated Applications carrying AppSchemaAST blueprints
  applications: defineTable({
    workspaceId: v.id("workspaces"),
    title: v.string(),
    description: v.optional(v.string()),
    domain: v.string(),
    ast: v.any(), // AppSchemaAST payload
    version: v.string(),
    theme: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  // Real-Time Collaboration Sessions
  collaborationSessions: defineTable({
    applicationId: v.id("applications"),
    sessionId: v.string(),
    activeAst: v.any(),
    updatedAt: v.number(),
  }).index("by_application", ["applicationId"]),

  // Real-Time AST Patch Operations Log
  astPatches: defineTable({
    sessionId: v.string(),
    senderId: v.string(),
    patchOp: v.string(),
    patchData: v.any(),
    timestamp: v.number(),
  }).index("by_session", ["sessionId"]),

  // Node Comments & Discussion Threads
  nodeComments: defineTable({
    applicationId: v.id("applications"),
    nodeId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    content: v.string(),
    resolved: v.boolean(),
    replies: v.array(
      v.object({
        id: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        content: v.string(),
        timestamp: v.number(),
      })
    ),
    createdAt: v.number(),
  }).index("by_application_node", ["applicationId", "nodeId"]),

  // User Presence Tracking
  presenceStates: defineTable({
    sessionId: v.string(),
    userId: v.string(),
    name: v.string(),
    color: v.string(),
    role: v.string(),
    selectedNodeId: v.union(v.string(), v.null()),
    cursor: v.union(v.object({ x: v.number(), y: v.number() }), v.null()),
    status: v.string(),
    lastActive: v.number(),
  }).index("by_session_user", ["sessionId", "userId"]),

  // AI Copilot Chat Messages
  messages: defineTable({
    applicationId: v.id("applications"),
    role: v.string(), // 'user' | 'ai'
    content: v.string(),
    timestamp: v.number(),
  }).index("by_application", ["applicationId"]),
});
