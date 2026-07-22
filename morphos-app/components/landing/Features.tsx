"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Wand2,
  Users,
  RefreshCcw,
  MessageSquare,
  Database,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Generates Complete Software",
    description: "Not just code — fully interactive dashboards, tables, and workflows built instantly from natural language.",
    color: "var(--primary)",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Multiple users interact with generated applications simultaneously with live cursor sync.",
    color: "var(--accent)",
  },
  {
    icon: RefreshCcw,
    title: "Adaptive Interface",
    description: "The UI evolves on the fly. Need a new chart or table? Just ask, and it appears.",
    color: "var(--success)",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Editing",
    description: "Modify database schemas, add features, and restructure layouts just by talking.",
    color: "var(--warning)",
  },
  {
    icon: Database,
    title: "Automatic Backend",
    description: "Tables, queries, mutations, and real-time subscriptions are generated automatically.",
    color: "var(--accent)",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Row-level security, role-based access control, and prompt injection prevention built-in.",
    color: "var(--primary)",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            A New Category of Software
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            MorphOS replaces fragmented SaaS tools with a single AI-powered platform
            that generates exactly what you need.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="glass group p-8 hover:border-[var(--card-border-hover)] transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[var(--card-border)] transition-all duration-300 group-hover:shadow-lg"
                style={{
                  background: `color-mix(in srgb, ${feature.color} 10%, transparent)`,
                }}
              >
                <feature.icon
                  size={22}
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
