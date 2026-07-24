
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import { MORPHOS_LOGO_URL } from "@/components/ui/Logo";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--card-border)] bg-[var(--surface-elevated)]/80 backdrop-blur-xl px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center group shrink-0">
          <img
            src={MORPHOS_LOGO_URL}
            alt="MorphOS"
            className="h-9 w-auto object-contain group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Dashboard Showcase */}
        <Link
          to="/dashboard"
          className="hidden md:flex items-center text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--hover-overlay)]"
        >
          Dashboard
        </Link>

        {/* Center: Search Input Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center">
            <Search size={15} className="absolute left-3 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask MorphOS to build..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/50 transition-all"
            />
          </div>
        </div>

        {/* Right: Live Sync Status Badge + Avatars + Notifications */}
        <div className="flex items-center gap-4">
          {/* Avatar Stack + Live Convex Badge */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[var(--hover-overlay)] border border-[var(--card-border)] text-xs">
            <div className="flex items-center -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border border-[var(--background)] flex items-center justify-center text-[10px] font-bold text-white">
                A
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 border border-[var(--background)] flex items-center justify-center text-[10px] font-bold text-white">
                B
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border border-[var(--background)] flex items-center justify-center text-[10px] font-bold text-white">
                C
              </div>
            </div>
            <div className="flex flex-col text-[10px] leading-tight">
              <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-500">LIVE</span>
              </div>
              <span className="text-[var(--text-muted)] text-[9px]">Powered by Convex Real-Time Sync Active</span>
            </div>
          </div>

          {/* Notification Bell */}
          <button
            aria-label="Notifications"
            className="p-2 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <Bell size={16} />
          </button>

          {/* User Profile Circle */}
          <Link
            to="/workspace/new"
            aria-label="User Workspace Profile"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white border border-[var(--card-border-hover)] hover:scale-105 transition-transform cursor-pointer shadow-md"
          >
            <User size={15} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
