export const ADMIN_DASHBOARD_AST = {
  version: "1.0.0",
  meta: {
    title: "System Administration & Infrastructure Health",
    description: "Cluster telemetry, error logs, and API latency metrics.",
    theme: "dark-glass",
  },
  layout: {
    type: "dashboard",
    columns: 12,
    gap: 16,
  },
  nodes: [
    {
      id: "a1d2e3f4-a5b6-4c7d-8e9f-bb1111111111",
      type: "hero-banner",
      gridPosition: { x: 0, y: 0, w: 12, h: 3 },
      props: {
        title: "MorphOS System Administration Center",
        description: "Real-time cluster monitoring and security posture.",
      },
    },
    {
      id: "a1d2e3f4-a5b6-4c7d-8e9f-bb2222222222",
      type: "progress",
      gridPosition: { x: 0, y: 3, w: 6, h: 3 },
      props: {
        title: "Cluster CPU Utilization",
        data: { value: 42 },
        config: { color: "#10B981" },
      },
    },
    {
      id: "a1d2e3f4-a5b6-4c7d-8e9f-bb3333333333",
      type: "progress",
      gridPosition: { x: 6, y: 3, w: 6, h: 3 },
      props: {
        title: "Memory Buffer Usage",
        data: { value: 68 },
        config: { color: "#8B5CF6" },
      },
    },
    {
      id: "a1d2e3f4-a5b6-4c7d-8e9f-bb4444444444",
      type: "data-table",
      gridPosition: { x: 0, y: 6, w: 12, h: 6 },
      props: {
        title: "Recent System Security Logs",
        data: [
          { ID: "LOG-401", Node: "us-east-1a", Event: "API Gateway Key Rotation", Severity: "Info", Time: "10 mins ago" },
          { ID: "LOG-402", Node: "eu-central-1", Event: "Database Failover Healthcheck", Severity: "Success", Time: "22 mins ago" },
          { ID: "LOG-403", Node: "ap-southeast-1", Event: "High Memory Threshold Spike", Severity: "Warning", Time: "45 mins ago" },
        ],
        config: { columns: ["ID", "Node", "Event", "Severity", "Time"] },
      },
    },
  ],
};
