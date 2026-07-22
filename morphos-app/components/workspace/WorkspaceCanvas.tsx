"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WorkspaceCanvasProps {
  children: React.ReactNode;
  activeViewKey?: string;
}

export function WorkspaceCanvas({ children, activeViewKey = "default" }: WorkspaceCanvasProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-12 py-8 scrollbar-none relative z-10">
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeViewKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
