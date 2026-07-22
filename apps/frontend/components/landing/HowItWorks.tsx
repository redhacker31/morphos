"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Describe",
    description: "Tell MorphOS what you need in plain English. No technical knowledge required.",
    color: "var(--primary)",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Generate",
    description: "AI agents design the UI, create the database, and wire up real-time logic.",
    color: "var(--accent)",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Evolve",
    description: "Refine with natural language. Add features, modify layouts, and share instantly.",
    color: "var(--success)",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Three steps from idea to fully functional application.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-[var(--primary)]/30 via-[var(--accent)]/30 to-[var(--success)]/30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-[var(--card-border)] relative z-10"
                style={{
                  background: `color-mix(in srgb, ${step.color} 10%, var(--background))`,
                  boxShadow: `0 0 30px color-mix(in srgb, ${step.color} 20%, transparent)`,
                }}
              >
                <step.icon size={26} style={{ color: step.color }} />
              </div>

              <span
                className="text-xs font-bold tracking-widest mb-3 uppercase"
                style={{ color: step.color }}
              >
                Step {step.step}
              </span>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
