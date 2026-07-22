import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new application workspace entry with AppSchemaAST
export const createApplication = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    title: v.string(),
    description: v.optional(v.string()),
    domain: v.string(),
    ast: v.any(),
    theme: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const appId = await ctx.db.insert("applications", {
      workspaceId: args.workspaceId,
      title: args.title,
      description: args.description,
      domain: args.domain,
      ast: args.ast,
      version: "1.0.0",
      theme: args.theme,
      createdAt: now,
      updatedAt: now,
    });
    return appId;
  },
});

// Query application by ID
export const getApplication = query({
  args: { applicationId: v.id("applications") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.applicationId);
  },
});

// Update application AppSchemaAST blueprint
export const updateApplicationAst = mutation({
  args: {
    applicationId: v.id("applications"),
    ast: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.applicationId, {
      ast: args.ast,
      theme: args.ast?.meta?.theme || "dark-glass",
      updatedAt: Date.now(),
    });
  },
});
