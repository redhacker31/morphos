export const FINANCIAL_ANALYTICS_AST = {
  version: "1.0.0",
  meta: {
    title: "Corporate Finance & Cashflow Analytics",
    description: "Net profit margin, operational expenses, and liquidity ratios.",
    theme: "cyberpunk-neon",
  },
  layout: {
    type: "dashboard",
    columns: 12,
    gap: 16,
  },
  nodes: [
    {
      id: "f1a2b3c4-d5e6-4f7a-8b9c-111111111111",
      type: "heading",
      gridPosition: { x: 0, y: 0, w: 12, h: 2 },
      props: {
        title: "Q3 Financial Intelligence Overview",
        description: "Real-time ledger audit and operational expenditure.",
      },
    },
    {
      id: "f1a2b3c4-d5e6-4f7a-8b9c-222222222222",
      type: "metric-card",
      gridPosition: { x: 0, y: 2, w: 6, h: 4 },
      props: {
        title: "Net Operating Revenue",
        description: "Year over year growth",
        data: { value: "12,840,000" },
        config: { unit: "$", trend: "+24.8%", isPositive: true },
      },
    },
    {
      id: "f1a2b3c4-d5e6-4f7a-8b9c-333333333333",
      type: "metric-card",
      gridPosition: { x: 6, y: 2, w: 6, h: 4 },
      props: {
        title: "Gross EBITDA Margin",
        description: "Target threshold 32%",
        data: { value: "34.2%" },
        config: { unit: "", trend: "+2.2%", isPositive: true },
      },
    },
    {
      id: "f1a2b3c4-d5e6-4f7a-8b9c-444444444444",
      type: "line-chart",
      gridPosition: { x: 0, y: 6, w: 12, h: 6 },
      props: {
        title: "Cash Burn vs Runway Velocity",
        description: "Monthly net cash consumption in USD",
        data: [
          { name: "Jan", value: 420 },
          { name: "Feb", value: 380 },
          { name: "Mar", value: 340 },
          { name: "Apr", value: 290 },
          { name: "May", value: 250 },
        ],
        config: { color: "#00F0FF" },
      },
    },
  ],
};
