"use client";

import React from "react";
import { motion } from "framer-motion";

export function BackgroundSystem() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Drifting Ambient Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 80, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--primary)]/10 blur-[130px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, -60, -100, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--secondary)]/10 blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent)]/5 blur-[120px]"
      />

      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle Vignette Edge */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[var(--background)]/80 opacity-90" />
    </div>
  );
}
