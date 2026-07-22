export const SALES_CRM_AST = {
  version: "1.0.0",
  meta: {
    title: "Enterprise Sales & ARR Dashboard",
    description: "Live pipeline revenue metrics and monthly deal forecasts.",
    theme: "dark-glass",
  },
  layout: {
    type: "dashboard",
    columns: 12,
    gap: 16,
  },
  nodes: [
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-111111111111",
      type: "hero-banner",
      gridPosition: { x: 0, y: 0, w: 12, h: 3 },
      props: {
        title: "Q3 Executive Revenue Operations",
        description: "Validated JSON AST Blueprint rendered dynamically by MorphOS Renderer Engine.",
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-222222222222",
      type: "metric-card",
      gridPosition: { x: 0, y: 3, w: 4, h: 4 },
      props: {
        title: "Total ARR Pipeline",
        description: "Compared to Q2 target",
        data: { value: "4,250,000" },
        config: { unit: "$", trend: "+18.4%", isPositive: true },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-333333333333",
      type: "metric-card",
      gridPosition: { x: 4, y: 3, w: 4, h: 4 },
      props: {
        title: "Average Deal Cycle",
        description: "Time to close",
        data: { value: "18.2" },
        config: { unit: "", trend: "-2.4 Days", isPositive: true },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-444444444444",
      type: "metric-card",
      gridPosition: { x: 8, y: 3, w: 4, h: 4 },
      props: {
        title: "Win Rate Percentage",
        description: "Closed-won deals",
        data: { value: "36.8%" },
        config: { unit: "", trend: "+4.1%", isPositive: true },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-555555555555",
      type: "bar-chart",
      gridPosition: { x: 0, y: 7, w: 6, h: 6 },
      props: {
        title: "Monthly Revenue Performance",
        description: "Actual ARR vs target quota",
        data: [
          { name: "Jan", value: 380 },
          { name: "Feb", value: 520 },
          { name: "Mar", value: 610 },
          { name: "Apr", value: 740 },
          { name: "May", value: 890 },
          { name: "Jun", value: 950 },
        ],
        config: { color: "#8B5CF6", xAxisKey: "name", yAxisKey: "value" },
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-666666666666",
      type: "pie-chart",
      gridPosition: { x: 6, y: 7, w: 6, h: 6 },
      props: {
        title: "Market Segment Share",
        description: "Revenue breakdown by customer tier",
        data: [
          { name: "Enterprise", value: 48 },
          { name: "Mid-Market", value: 32 },
          { name: "SMB", value: 20 },
        ],
      },
    },
    {
      id: "a1b2c3d4-e5f6-4a5b-8c9d-777777777777",
      type: "data-table",
      gridPosition: { x: 0, y: 13, w: 12, h: 6 },
      props: {
        title: "Recent High-Value Accounts",
        description: "Key enterprise pipeline deals",
        data: [
          { ID: "ACC-901", Name: "Acme Corp Enterprise", Stage: "Negotiation", ARR: "$180,000", Owner: "Sarah M." },
          { ID: "ACC-902", Name: "Starlight Logistics", Stage: "Proposal Sent", ARR: "$95,000", Owner: "David K." },
          { ID: "ACC-903", Name: "Global Health Systems", Stage: "Qualified", ARR: "$240,000", Owner: "Elena R." },
          { ID: "ACC-904", Name: "Apex Data Group", Stage: "Closed Won", ARR: "$150,000", Owner: "Sarah M." },
        ],
        config: { columns: ["ID", "Name", "Stage", "ARR", "Owner"] },
      },
    },
  ],
};
