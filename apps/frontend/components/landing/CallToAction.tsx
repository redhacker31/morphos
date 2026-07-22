"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto relative"
      >
        <div className="p-[1px] rounded-3xl bg-gradient-to-br from-[var(--primary)]/50 to-[var(--accent)]/50">
          <div className="glass-strong rounded-3xl py-20 px-8 text-center relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card)] text-xs text-[var(--text-secondary)] mb-6">
                <Sparkles size={12} className="text-[var(--primary)]" />
                Ready to start
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Start Building in Seconds
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto mb-10 leading-relaxed">
                No setup. No configuration. Just describe what you need and
                watch MorphOS generate your application.
              </p>

              <Link
                href="/workspace/new"
                className="btn-primary text-base px-8 py-3.5 group inline-flex"
              >
                Launch Workspace
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
