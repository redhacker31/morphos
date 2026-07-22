import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new dynamic dashboard
export const createDashboard = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    title: v.string(),
    schema: v.any(), // Accepts the complex JSON layout schema
  },
  handler: async (ctx, args) => {
    const dashboardId = await ctx.db.insert("dashboards", {
      workspaceId: args.workspaceId,
      title: args.title,
      schema: args.schema,
      createdAt: Date.now(),
    });
    return dashboardId;
  },
});

// Get a dashboard by its ID (Powers the Real-time UI Sync)
export const getDashboard = query({
  args: { dashboardId: v.id("dashboards") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.dashboardId);
  },
});

// Update the dashboard layout (e.g. Copilot adds a widget)
export const updateDashboardSchema = mutation({
  args: {
    dashboardId: v.id("dashboards"),
    schema: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.dashboardId, {
      schema: args.schema,
    });
  },
});
