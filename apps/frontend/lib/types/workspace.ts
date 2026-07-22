import type { LucideIcon } from "lucide-react";

/**
 * Workspace Metadata Contract
 */
export interface Workspace {
  id: string;
  name: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  description?: string;
  createdAt: number;
  updatedAt: number;
}

/**
 * Project / Application Blueprint Item Contract
 */
export interface Project {
  id: string;
  title: string;
  category: string;
  lastModified: string;
  status: "Active" | "Draft" | "Synced";
  isFavorite: boolean;
  size: string;
  nodeCount: number;
}

/**
 * Application Template Contract
 */
export interface Template {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  color: string;
  desc: string;
  widgetsCount: number;
}

/**
 * Prompt History Item Contract
 */
export interface PromptHistoryItem {
  id: string;
  promptText: string;
  timestamp: string;
  category: string;
  isPinned: boolean;
  generatedAppTitle?: string;
}

/**
 * User Notification Contract
 */
export interface UserNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: "info" | "success" | "warning";
}

/**
 * User Profile Contract
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

/**
 * Data-Driven Navigation Item Contract
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  shortcut?: string;
}

/**
 * Data-Driven Navigation Group Contract
 */
export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}
