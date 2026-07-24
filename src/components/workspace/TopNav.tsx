
import React, { useState } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  CloudLightning,
  Sparkles,
  Command,
  HelpCircle,
  FolderOpen,
  Wifi,
  Layers,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface TopNavProps {
  projectName?: string;
  onOpenCommandPalette?: () => void;
  userId?: string | null;
  onSignOut?: () => void;
}

export default function TopNav({
  projectName = "Main Studio",
  onOpenCommandPalette,
  userId,
  onSignOut,
}: TopNavProps) {
  const shortId = userId ? userId.slice(0, 8) : "guest";
  const [showNotifications, setShowNotifications] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-[var(--card-border)] bg-[var(--surface-elevated)]/80 backdrop-blur-xl shrink-0 z-[1010] relative select-none">
      {/* Left — Workspace Switcher & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--text-muted)]">Workspace</span>
          <span className="text-[var(--text-muted)] text-xs">/</span>
          <span className="text-xs font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-1.5">
            <FolderOpen size={13} className="text-[var(--primary)]" />
            <span>{projectName}</span>
          </span>
          <Badge
            variant="outline"
            className="text-[9px] px-2 py-0.5 border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] font-bold font-mono tracking-wider hidden sm:inline-flex"
          >
            PHASE 1
          </Badge>
        </div>
      </div>

      {/* Center — Command Palette Trigger Search Box */}
      <div className="relative hidden md:block w-72">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between bg-[var(--hover-overlay)] border border-[var(--card-border)] hover:border-[var(--card-border-hover)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer group shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search size={14} className="text-[var(--primary)] group-hover:scale-110 transition-transform" />
            <span>Search or command...</span>
          </div>
          <kbd className="text-[9px] font-mono bg-[var(--active-overlay)] px-1.5 py-0.5 rounded border border-[var(--card-border)] text-[var(--text-primary)] font-bold">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">
        {/* Real-time Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--success)]/20 bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-extrabold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
          <span>REAL-TIME ACTIVE</span>
        </div>

        {/* Command Button for Mobile/Tablet */}
        <button
          onClick={onOpenCommandPalette}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--hover-overlay)] text-[var(--text-primary)] transition-colors cursor-pointer"
          title="Open Command Palette"
        >
          <Command size={14} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--hover-overlay)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Toggle theme"
          title="Toggle Theme"
        >
          {themeMode === "dark" ? <Moon size={15} /> : <Sun size={15} className="text-amber-400" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--card-border)] bg-[var(--hover-overlay)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)] animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-72 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--card-border)] shadow-2xl p-4 space-y-3 z-30">
              <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-2">
                <span className="text-xs font-bold text-[var(--text-primary)]">Notifications</span>
                <span className="text-[10px] text-[var(--primary)] font-semibold">2 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-[var(--hover-overlay)] space-y-1">
                  <div className="font-semibold text-[var(--text-primary)]">Phase 1 Foundation Locked</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Workspace shell production-ready.</div>
                </div>
                <div className="p-2 rounded-lg bg-[var(--hover-overlay)] space-y-1">
                  <div className="font-semibold text-[var(--text-primary)]">Zod AST Schema Verified</div>
                  <div className="text-[10px] text-[var(--text-muted)]">AppSchema ready for Phase 2 renderer.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:opacity-85 transition-opacity cursor-pointer">
              <Avatar className="w-8 h-8 border border-[var(--card-border-hover)] rounded-xl">
                <AvatarFallback className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white text-xs font-extrabold rounded-xl">
                  G
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 bg-[var(--surface-elevated)] border border-[var(--card-border)] text-[var(--text-primary)] text-xs p-1"
          >
            <div className="px-3 py-2 border-b border-[var(--card-border)]">
              <div className="font-bold text-[var(--text-primary)]">Guest</div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">anon · {shortId}</div>
            </div>
            <DropdownMenuItem className="cursor-pointer focus:bg-[var(--active-overlay)] rounded-lg">Workspace Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer focus:bg-[var(--active-overlay)] rounded-lg">Design System Tokens</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[var(--active-overlay)]" />
            <DropdownMenuItem
              className="cursor-pointer focus:bg-red-500/10 text-red-400 rounded-lg"
              onSelect={() => onSignOut?.()}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
