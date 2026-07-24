import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { CryptoBentoDashboard } from "@/components/dashboard/CryptoBentoDashboard";
import { ShaderBackground } from "@/components/backgrounds/ShaderBackground";
import { useSession } from "@/hooks/useSession";
import { useCryptoPortfolio } from "@/hooks/useCryptoPortfolio";

export default function CryptoDashboardPage() {
  const { ready } = useSession();
  const { portfolio, loading } = useCryptoPortfolio(ready);

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      <ShaderBackground className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

      <div className="relative max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[var(--primary)]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
              Showcase
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Crypto Portfolio Bento
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1 max-w-xl">
            A pastel fintech dashboard reimagined in the MorphOS dark-glass design system, wired to
            live, per-user data persisted in Enter Cloud.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-56 rounded-3xl border border-[var(--card-border)] bg-[var(--hover-overlay)] skeleton" />
            ))}
          </div>
        ) : (
          <CryptoBentoDashboard portfolio={portfolio ?? undefined} />
        )}
      </div>
    </div>
  );
}
