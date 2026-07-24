import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Zap, Users, TrendingUp, Cpu, Wand2 } from "lucide-react";
export function Hero() {
  const [promptValue, setPromptValue] = useState("Generate an ERP for School");
  return <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-transparent text-[var(--text-primary)]">
      {/* Background Vertical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-[1500px] mx-auto px-6 opacity-20">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent" />
      </div>

      {/* Floating Glassmorphism Badges */}
      {/* 1. Top Left Badge */}
      <div className="absolute top-32 left-8 md:left-20 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] backdrop-blur-md text-xs font-semibold text-[var(--text-secondary)] shadow-elev-2">
        <div className="w-5 h-5 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
          <Cpu size={12} />
        </div>
        <span>AI Generated</span>
      </div>

      {/* 2. Bottom Left Badge */}
      <div className="absolute bottom-40 left-12 md:left-24 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] backdrop-blur-md text-xs font-semibold text-[var(--text-secondary)] shadow-elev-2">
        <div className="w-5 h-5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
          <Zap size={12} />
        </div>
        <span>Live Sync</span>
      </div>

      {/* 3. Top Right Badge */}
      <div className="absolute top-36 right-8 md:right-20 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] backdrop-blur-md text-xs font-semibold text-[var(--text-secondary)] shadow-elev-2">
        <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          <Users size={12} />
        </div>
        <span>3 Collaborators Online</span>
      </div>

      {/* 4. Bottom Right Badge */}
      <div className="absolute bottom-36 right-12 md:right-24 hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] backdrop-blur-md text-xs font-semibold text-[var(--text-secondary)] shadow-elev-2">
        <div className="w-5 h-5 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <TrendingUp size={12} />
        </div>
        <span>Analytics Generated</span>
      </div>

      {/* Central Headline */}
      <div className="text-center max-w-5xl mx-auto z-10 space-y-4 mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] leading-tight">
          Build Software Using
        </h1>

        <div className="py-2">
          <span className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] leading-none">
            Natural Language
          </span>
        </div>

        <div className="pt-4 text-[var(--text-secondary)] text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
          <p className="text-[19px]">Instead of learning software, simply describe what you need.</p>
          <p className="text-[19px]">MorphOS generates complete applications instantly using AI.</p>
        </div>
      </div>

      {/* Central Interactive Hero Prompt Card */}
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="p-[1.5px] rounded-3xl bg-gradient-to-r from-[var(--primary)]/50 via-[var(--accent)]/50 to-[var(--secondary)]/50 shadow-[0_0_60px_rgba(82,39,255,0.25)]">
          <div className="bg-[var(--surface)]/80 backdrop-blur-2xl rounded-3xl p-8 border border-[var(--card-border)] flex flex-col justify-between min-h-[220px]">
            {/* Prompt Input Header */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[var(--primary)]/15 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] shrink-0">
                <Sparkles size={20} className="animate-spin" style={{
                animationDuration: "8s"
              }} />
              </div>
              <input type="text" value={promptValue} onChange={e => setPromptValue(e.target.value)} className="w-full bg-transparent text-xl sm:text-2xl font-bold text-[var(--text-primary)] focus:outline-none placeholder-[var(--text-muted)] tracking-tight" placeholder="Describe your application..." />
            </div>

            {/* Bottom Generate Button */}
            <div className="flex justify-end pt-8">
              <Link to="/workspace/new" className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] hover:opacity-90 text-white font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(82,39,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                <Wand2 size={18} />
                <span>Generate Application</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
}