"use client";

import React, { ComponentType } from "react";
import dynamic from "next/dynamic";

// ─── Widget Props Interface ─────────────────────────────────────────────────
export interface WidgetProps {
  widgetId: string;
  events?: Array<{ trigger: string; action: string; payload?: Record<string, unknown> }>;
  metadata?: Record<string, unknown>;
  children?: React.ReactNode;
  [key: string]: unknown;
}

// ─── Registry ───────────────────────────────────────────────────────────────
// No switch statements. Pure dictionary lookup.

const registry = new Map<string, ComponentType<WidgetProps>>();

export const componentRegistry = {
  register(type: string, component: ComponentType<WidgetProps>) {
    registry.set(type, component);
  },

  get(type: string): ComponentType<WidgetProps> | undefined {
    return registry.get(type);
  },

  has(type: string): boolean {
    return registry.has(type);
  },

  list(): string[] {
    return Array.from(registry.keys());
  },
};

import LineChartWidget from "../widgets/LineChartWidget";
import PieChartWidget from "../widgets/PieChartWidget";
import BarChartWidget from "../widgets/BarChartWidget";
import TableWidget from "../widgets/TableWidget";

// ─── Eagerly-loaded Light Widgets ───────────────────────────────────────────
import { KpiCardWidget } from "../widgets/KpiCardWidget";
import { StatCardWidget } from "../widgets/StatCardWidget";
import { MetricCardWidget } from "../widgets/MetricCardWidget";
import { ButtonWidget, InputWidget, TextWidget, HeadingWidget, DividerWidget } from "../widgets/ButtonWidget";
import { SectionWidget, ContainerWidget } from "../widgets/SectionWidget";
import { SidebarWidget, NavbarWidget } from "../widgets/SidebarWidget";
import { ModalWidget, AiChatWidget } from "../widgets/ModalWidget";

// ─── Register Everything ────────────────────────────────────────────────────
componentRegistry.register("KpiCard", KpiCardWidget);
componentRegistry.register("StatCard", StatCardWidget);
componentRegistry.register("MetricCard", MetricCardWidget);
componentRegistry.register("Button", ButtonWidget);
componentRegistry.register("Input", InputWidget);
componentRegistry.register("Text", TextWidget);
componentRegistry.register("Heading", HeadingWidget);
componentRegistry.register("Divider", DividerWidget);
componentRegistry.register("Section", SectionWidget);
componentRegistry.register("Container", ContainerWidget);
componentRegistry.register("Sidebar", SidebarWidget);
componentRegistry.register("Navbar", NavbarWidget);
componentRegistry.register("Modal", ModalWidget);
componentRegistry.register("AiChat", AiChatWidget);

componentRegistry.register("LineChart", LineChartWidget);
componentRegistry.register("PieChart", PieChartWidget);
componentRegistry.register("BarChart", BarChartWidget);
componentRegistry.register("Table", TableWidget);
