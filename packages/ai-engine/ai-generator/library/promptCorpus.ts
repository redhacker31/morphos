export interface PromptPreset {
  id: string;
  domain: string;
  title: string;
  prompt: string;
}

export const PROMPT_CORPUS: PromptPreset[] = [
  {
    id: "prompt-1",
    domain: "Sales CRM",
    title: "SaaS Enterprise CRM",
    prompt: "Create a CRM for a SaaS company with sales pipeline, revenue dashboard, customer table, onboarding workflow, and KPI cards.",
  },
  {
    id: "prompt-2",
    domain: "HR",
    title: "Employee Portal",
    prompt: "Create an HR Portal for tracking department headcount, employee onboarding status, performance review metrics, and leave request tables.",
  },
  {
    id: "prompt-3",
    domain: "ERP",
    title: "Enterprise ERP System",
    prompt: "Design an ERP enterprise system for warehouse inventory management, supply chain SKU tracking, order fulfillment, and logistics metrics.",
  },
  {
    id: "prompt-4",
    domain: "Analytics",
    title: "Web Traffic BI",
    prompt: "Create an Analytics Dashboard with monthly active user trends, conversion funnel bar chart, channel acquisition breakdown, and key metrics.",
  },
  {
    id: "prompt-5",
    domain: "Portfolio",
    title: "Crypto & Stock Portfolio",
    prompt: "Build an AI Portfolio Tracker with net asset value KPI cards, crypto & stock asset allocation pie chart, and transaction ledger.",
  },
  {
    id: "prompt-6",
    domain: "Hospital",
    title: "ER Triage & Occupancy",
    prompt: "Create a Hospital Management Dashboard with ER triage queue status, bed occupancy rate metrics, doctor shift schedules, and patient records table.",
  },
  {
    id: "prompt-7",
    domain: "Education",
    title: "Student Portal",
    prompt: "Create a School Management Portal for student course enrollment analytics, grade distributions, attendance progress, and faculty directory.",
  },
  {
    id: "prompt-8",
    domain: "Sales",
    title: "Sales Forecast Dashboard",
    prompt: "Generate a Sales Dashboard with quarterly revenue forecasts, deal stage conversion rates, top sales rep leaderboard table, and MRR metrics.",
  },
  {
    id: "prompt-9",
    domain: "Startup",
    title: "Startup KPI Intelligence",
    prompt: "Build a Startup KPI Dashboard with monthly burn rate metrics, runway remaining, customer acquisition cost (CAC), LTV ratio, and ARR trend graph.",
  },
  {
    id: "prompt-10",
    domain: "Finance",
    title: "Financial Reporting App",
    prompt: "Generate a Financial Reporting App with EBITDA margins, operating cashflow trend, expense breakdown charts, and balance sheet summary table.",
  },
  {
    id: "prompt-11",
    domain: "Manufacturing",
    title: "Assembly Line Telemetry",
    prompt: "Build a manufacturing plant telemetry app with equipment overall effectiveness (OEE) metrics, downtime logs, and production output graphs.",
  },
  {
    id: "prompt-12",
    domain: "Retail",
    title: "POS Store Operations",
    prompt: "Design a retail store operations app with daily store revenue metrics, inventory replenishment alerts, top selling items, and cashier sales data table.",
  },
  {
    id: "prompt-13",
    domain: "Admin",
    title: "Cloud Infrastructure Control",
    prompt: "Build a system administration dashboard with cluster CPU usage, memory progress indicators, server node health grid, and security log table.",
  },
  {
    id: "prompt-14",
    domain: "Inventory",
    title: "Warehouse Stock Control",
    prompt: "Build an inventory management portal with low stock alert callout, logistics hub stat grid, and warehouse SKU stock ledger table.",
  },
  {
    id: "prompt-15",
    domain: "Project Management",
    title: "Agile Sprint Tracker",
    prompt: "Build a project management dashboard with sprint burndown chart, team velocity metrics, open task list table, and milestone progress bar.",
  },
  {
    id: "prompt-16",
    domain: "Customer Support",
    title: "Helpdesk Ticket Hub",
    prompt: "Create a customer support helpdesk dashboard with first response time metrics, SLA compliance rate, open ticket queue table, and agent rating breakdown.",
  },
  {
    id: "prompt-17",
    domain: "Marketing",
    title: "Omnichannel Campaign BI",
    prompt: "Design a marketing campaign dashboard with ROAS metrics, lead generation conversion funnel, ad spend breakdown pie chart, and campaign performance table.",
  },
  {
    id: "prompt-18",
    domain: "E-commerce",
    title: "Online Store Fulfillment",
    prompt: "Build an e-commerce dashboard with gross merchandise value (GMV), shopping cart abandonment rate, recent orders table, and fulfillment status progress.",
  },
  {
    id: "prompt-19",
    domain: "Logistics",
    title: "Fleet Operations Hub",
    prompt: "Create a logistics fleet management app with active vehicle metrics, delivery delay alerts, fuel efficiency graph, and driver dispatch table.",
  },
  {
    id: "prompt-20",
    domain: "Real Estate",
    title: "Property Lease Manager",
    prompt: "Design a real estate management portal with occupancy rate metrics, monthly rental income graph, property listings table, and lease renewal alerts.",
  },
  {
    id: "prompt-21",
    domain: "Legal",
    title: "Litigation Case Tracker",
    prompt: "Build a legal case management app with billable hours metrics, upcoming court dates table, active matter status progress, and client retainer balances.",
  },
  {
    id: "prompt-22",
    domain: "Media",
    title: "Content Streaming Analytics",
    prompt: "Create a digital media analytics app with subscriber churn rate metrics, daily stream time graph, top trending videos table, and content engagement score.",
  },
  {
    id: "prompt-23",
    domain: "Realtime Monitoring",
    title: "DevOps Incident Monitor",
    prompt: "Build a real-time system monitoring app with API latency metrics, error rate graph, active incident log table, and service health badges.",
  },
  {
    id: "prompt-24",
    domain: "Supply Chain",
    title: "Vendor Lead Time Operations",
    prompt: "Create a supply chain operational portal with supplier lead time metrics, purchase order status grid, shipping delay alerts, and vendor evaluation table.",
  },
  {
    id: "prompt-25",
    domain: "Executive KPI",
    title: "Boardroom Executive Summary",
    prompt: "Generate an executive boardroom dashboard with quarterly revenue metrics, net promoter score (NPS), strategic roadmap progress, and enterprise risk matrix.",
  },
];
