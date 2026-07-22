"use client";

import React, { memo } from "react";
import type { WidgetProps } from "../engine/ComponentRegistry";

export const SidebarWidget = memo(function SidebarWidget(props: WidgetProps) {
  const { items, activeIndex = 0 } = props as {
    items?: { label: string; icon: string }[]; activeIndex?: number;
  } & WidgetProps;

  const defaultItems = [
    { label: "Dashboard", icon: "squares-four" },
    { label: "Projects", icon: "folder" },
    { label: "Analytics", icon: "chart-line-up" },
    { label: "Finance", icon: "currency-dollar" },
    { label: "AI Apps", icon: "robot" },
    { label: "Team", icon: "users" },
  ];

  const navItems = items ?? defaultItems;

  return (
    <aside className="app-sidebar" style={{ minHeight: "100%" }}>
      <ul className="nav-links">
        {navItems.map((item, i) => (
          <li key={i} className={i === activeIndex ? "active" : ""}>
            <i className={`ph ph-${item.icon}`}></i>
            {item.label}
          </li>
        ))}
      </ul>
      <div className="sidebar-bottom">
        <li><i className="ph ph-gear"></i> Settings</li>
      </div>
    </aside>
  );
});

export const NavbarWidget = memo(function NavbarWidget(props: WidgetProps) {
  const { brand = "MorphOS", searchPlaceholder } = props as {
    brand?: string; searchPlaceholder?: string;
  } & WidgetProps;

  return (
    <nav className="top-nav" style={{ gridColumn: "1 / -1" }}>
      <div className="logo">
        <i className="ph ph-hexagon" style={{ color: "var(--accent)", fontSize: "1.5rem" }}></i>
        <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>{brand}</span>
      </div>
      <div className="nav-center">
        <div className="search-bar">
          <i className="ph ph-magnifying-glass"></i>
          <input type="text" placeholder={searchPlaceholder ?? "Search..."} />
        </div>
      </div>
    </nav>
  );
});
