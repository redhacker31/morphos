"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Zap, Users, TrendingUp, Cpu, Wand2 } from "lucide-react";

export function Hero() {
  const [promptValue, setPromptValue] = useState("Generate an ERP for School");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-[#070a12]">
      {/* Background Vertical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-[1500px] mx-auto px-6 opacity-15">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* Floating Glassmorphism Badges */}
      {/* 1. Top Left Badge */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-32 left-8 md:left-20 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-zinc-200 shadow-xl"
      >
        <div className="w-5 h-5 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
          <Cpu size={12} />
        </div>
        <span>AI Generated</span>
      </motion.div>

      {/* 2. Bottom Left Badge */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-40 left-12 md:left-24 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-zinc-200 shadow-xl"
      >
        <div className="w-5 h-5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
          <Zap size={12} />
        </div>
        <span>Live Sync</span>
      </motion.div>

      {/* 3. Top Right Badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-36 right-8 md:right-20 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-zinc-200 shadow-xl"
      >
        <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <Users size={12} />
        </div>
        <span>3 Collaborators Online</span>
      </motion.div>

      {/* 4. Bottom Right Badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-36 right-12 md:right-24 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-zinc-200 shadow-xl"
      >
        <div className="w-5 h-5 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <TrendingUp size={12} />
        </div>
        <span>Analytics Generated</span>
      </motion.div>

      {/* Central Headline */}
      <div className="text-center max-w-5xl mx-auto z-10 space-y-3 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight whitespace-nowrap"
        >
          Build Software Using
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#06b6d4] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,197,94,0.4)] leading-none"
        >
          Natural Language
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-3 text-zinc-400 text-base sm:text-lg md:text-xl font-normal max-w-xl mx-auto leading-relaxed"
        >
          <p>Instead of learning software, simply describe what you need.</p>
          <p>MorphOS generates complete applications instantly using AI.</p>
        </motion.div>
      </div>

      {/* Central Interactive Hero Prompt Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full max-w-2xl mx-auto z-10"
      >
        <div className="p-[1.5px] rounded-3xl bg-gradient-to-r from-red-500/40 via-purple-500/40 to-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.2)]">
          <div className="bg-[#0e1322]/90 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 flex flex-col justify-between min-h-[220px]">
            {/* Prompt Input Header */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center text-[#06b6d4] shrink-0">
                <Sparkles size={20} className="animate-spin" style={{ animationDuration: "8s" }} />
              </div>
              <input
                type="text"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                className="w-full bg-transparent text-xl sm:text-2xl font-bold text-white focus:outline-none placeholder-zinc-500 tracking-tight"
                placeholder="Describe your application..."
              />
            </div>

            {/* Bottom Generate Button */}
            <div className="flex justify-end pt-8">
              <Link
                href="/workspace/new"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Wand2 size={18} />
                <span>Generate Application</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
