import React from "react";
import { motion } from "framer-motion";
import { Cpu, Server, Database, ShieldCheck, Zap, Layers, Code2, Network } from "lucide-react";
const STACK_ITEMS = [{
  name: "Next.js 16 (App Router)",
  role: "Frontend Shell & Edge API",
  icon: Cpu,
  category: "Frontend",
  description: "Turbopack-powered SSR & Edge routing for instant initial loads."
}, {
  name: "React 19 & TypeScript 5",
  role: "UI Component Architecture",
  icon: Code2,
  category: "Frontend",
  description: "Strictly typed pure presentational components with zero implicit any."
}, {
  name: "Convex Real-time DB",
  role: "Single Source of Truth",
  icon: Database,
  category: "Persistence",
  description: "Sub-30ms reactive WebSocket sync and transactional state storage."
}, {
  name: "Python FastAPI 3.12",
  role: "AI Orchestration Gateway",
  icon: Server,
  category: "Backend",
  description: "Pydantic-validated microservices for vector embeddings and graph analysis."
}, {
  name: "Zod Schema Engine",
  role: "AST Contract Gatekeeper",
  icon: ShieldCheck,
  category: "Validation",
  description: "Guarantees 100% type safety and invalid payload interception before render."
}, {
  name: "ChromaDB & Neo4j",
  role: "Vector & Knowledge Graph",
  icon: Network,
  category: "Intelligence",
  description: "Deep contextual reasoning and multi-modal document memory."
}];
export function TechStack() {
  return <section className="py-24 relative overflow-hidden bg-[var(--background-secondary)] border-y border-[var(--card-border)] shadow-[0px_4px_16px_0px_#D910F4FF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--card-border)] text-xs font-semibold text-[var(--secondary)]">
            <Zap size={14} />
            <span>Frozen Enterprise Technology Foundation</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] md:text-5xl tracking-tight">
            Built on Enterprise Standards
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Every layer of MorphOS uses locked, proven technology decisions engineered for performance, scalability, and type safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return <motion.div key={item.name} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4,
            delay: index * 0.08
          }} whileHover={{
            y: -4,
            transition: {
              duration: 0.2
            }
          }} className="rounded-2xl bg-[var(--surface)] border border-[var(--card-border)] p-6 space-y-4 shadow-xl hover:border-[var(--card-border-hover)] transition-all group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[var(--hover-overlay)] border border-[var(--card-border)] flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)] bg-[var(--hover-overlay)] px-2.5 py-1 rounded-md border border-[var(--card-border)]">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-xs font-medium text-[var(--secondary)]">
                    {item.role}
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>;
        })}
        </div>
      </div>
    </section>;
}