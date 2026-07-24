// ============================================
// MorphOS Mock Data — Phase 1
// Centralized mock data for all workspace views
// ============================================

export interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string; // Lucide icon name
  color: string;
}

export interface PromptHistoryItem {
  id: string;
  text: string;
  timestamp: string;
  pinned: boolean;
  favorited: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: "csv" | "excel" | "pdf";
  progress: number;
}

// ---- Chat Messages ----
export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "ai",
    content: "Welcome to MorphOS! I'm your AI workspace assistant. Describe the application you'd like to build, and I'll generate it for you.",
    timestamp: "2 min ago",
  },
  {
    id: "msg-2",
    role: "user",
    content: "I need a sales dashboard with revenue tracking, customer pipeline, and monthly reports.",
    timestamp: "1 min ago",
  },
  {
    id: "msg-3",
    role: "ai",
    content: "I'll create a Sales Dashboard with:\n\n• Revenue KPI cards with trend indicators\n• Customer pipeline kanban view\n• Monthly revenue line chart\n• Recent deals table\n\nShall I proceed with this layout?",
    timestamp: "Just now",
  },
];

// ---- Templates ----
export const mockTemplates: Template[] = [
  {
    id: "tmpl-1",
    title: "Sales Dashboard",
    description: "Track revenue, deals, and team performance with real-time KPIs and charts.",
    category: "Business",
    icon: "TrendingUp",
    color: "#8B5CF6",
  },
  {
    id: "tmpl-2",
    title: "CRM",
    description: "Manage customer relationships, track interactions, and automate follow-ups.",
    category: "Business",
    icon: "Users",
    color: "#06B6D4",
  },
  {
    id: "tmpl-3",
    title: "Inventory Manager",
    description: "Monitor stock levels, track orders, and manage warehouse operations.",
    category: "Operations",
    icon: "Package",
    color: "#10B981",
  },
  {
    id: "tmpl-4",
    title: "Finance Tracker",
    description: "Budget tracking, expense categorization, and financial forecasting.",
    category: "Finance",
    icon: "DollarSign",
    color: "#F59E0B",
  },
  {
    id: "tmpl-5",
    title: "Hospital Management",
    description: "Patient records, appointment scheduling, and department management.",
    category: "Healthcare",
    icon: "Heart",
    color: "#EF4444",
  },
  {
    id: "tmpl-6",
    title: "Analytics Dashboard",
    description: "Website analytics, user behavior tracking, and conversion funnels.",
    category: "Analytics",
    icon: "BarChart3",
    color: "#8B5CF6",
  },
  {
    id: "tmpl-7",
    title: "Expense Tracker",
    description: "Personal and team expense management with receipt scanning and reports.",
    category: "Finance",
    icon: "Receipt",
    color: "#06B6D4",
  },
  {
    id: "tmpl-8",
    title: "Project Manager",
    description: "Task boards, timelines, and team collaboration for project delivery.",
    category: "Productivity",
    icon: "KanbanSquare",
    color: "#10B981",
  },
  {
    id: "tmpl-crypto",
    title: "Crypto Portfolio Bento",
    description: "Live crypto bento: sales stats, transactions, balance gauge, and market forecast.",
    category: "Finance",
    icon: "Bitcoin",
    color: "#F7931A",
  },
];

// ---- Prompt History ----
export const mockPromptHistory: PromptHistoryItem[] = [
  {
    id: "ph-1",
    text: "Create a sales dashboard with revenue tracking and customer pipeline",
    timestamp: "2 hours ago",
    pinned: true,
    favorited: true,
  },
  {
    id: "ph-2",
    text: "Build an inventory management system for a warehouse",
    timestamp: "5 hours ago",
    pinned: false,
    favorited: true,
  },
  {
    id: "ph-3",
    text: "Generate a CRM with contact management and deal tracking",
    timestamp: "1 day ago",
    pinned: true,
    favorited: false,
  },
  {
    id: "ph-4",
    text: "Create an expense tracker with receipt scanning",
    timestamp: "2 days ago",
    pinned: false,
    favorited: false,
  },
  {
    id: "ph-5",
    text: "Build a hospital patient management dashboard",
    timestamp: "3 days ago",
    pinned: false,
    favorited: false,
  },
  {
    id: "ph-6",
    text: "Design an analytics dashboard for website traffic",
    timestamp: "1 week ago",
    pinned: false,
    favorited: true,
  },
];

// ---- Uploaded Files (for demo) ----
export const mockUploadedFiles: UploadedFile[] = [
  {
    id: "file-1",
    name: "Q4_Revenue_Report.csv",
    size: "2.4 MB",
    type: "csv",
    progress: 100,
  },
  {
    id: "file-2",
    name: "Employee_Data.xlsx",
    size: "5.1 MB",
    type: "excel",
    progress: 72,
  },
];

// ---- Sidebar Navigation ----
export interface SidebarNavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  section: "main" | "bottom";
}

export const sidebarNavItems: SidebarNavItem[] = [
  { id: "workspace", label: "Workspace", icon: "LayoutDashboard", section: "main" },
  { id: "templates", label: "Templates", icon: "LayoutTemplate", section: "main" },
  { id: "history", label: "History", icon: "Clock", section: "main" },
  { id: "applications", label: "Applications", icon: "AppWindow", section: "main" },
  { id: "favorites", label: "Favorites", icon: "Star", section: "main" },
  { id: "settings", label: "Settings", icon: "Settings", section: "bottom" },
  { id: "help", label: "Help", icon: "HelpCircle", section: "bottom" },
];
