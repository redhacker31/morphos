import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  ChevronDown,
  ArrowUp,
  ArrowLeftRight,
  Wallet,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  Smile,
} from "lucide-react";
import { CHART_TICK, CHART_GRID, CHART_CURSOR, ChartTooltip } from "@/features/renderer/widgets/charts/chartUtils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VIOLET = "#8b5cf6";
const EMERALD = "#22c55e";

// ============ Types ============
export interface SalesStatisticsData {
  title: string;
  subtitle: string;
  period: string;
  visitors: number;
  chartData: { month: string; value1: number; value2: number }[];
}
export interface TransactionData {
  title: string;
  subtitle: string;
  amount: string;
  avatars: string[];
}
export interface BalanceData {
  title: string;
  balance: string;
  percentage: number;
  avgScore: string;
}
export interface TimelineItem {
  year: string;
  description: string;
  isActive?: boolean;
}
export interface MarketForecastData {
  title: string;
  timeline: TimelineItem[];
  btcPrice: string;
  btcGrowth: string;
  marketCap: string;
}
export interface CryptoPortfolio {
  sales: SalesStatisticsData;
  transactions: TransactionData;
  balance: BalanceData;
  forecast: MarketForecastData;
}

// ============ Default (seed) payload — persisted to Enter Cloud on first load ============
export const DEFAULT_PORTFOLIO: CryptoPortfolio = {
  sales: {
    title: "Sales Statistics",
    subtitle: "Updated 1 day ago",
    period: "Monthly",
    visitors: 2025,
    chartData: [
      { month: "September", value1: 35, value2: 50 },
      { month: "November", value1: 30, value2: 70 },
    ],
  },
  transactions: {
    title: "Recent Transactions",
    subtitle: "Sell currency",
    amount: "12.53 ETH / BTC",
    avatars: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-4dcc5cd30a9f?w=100&h=100&fit=crop&crop=face",
    ],
  },
  balance: { title: "Current balance", balance: "15,368$", percentage: 14, avgScore: "18,324$" },
  forecast: {
    title: "Market forecast",
    timeline: [
      { year: "2023", description: "Explosive growth of DeFi" },
      { year: "2024", description: "Mainstream adoption of CBDCs" },
      { year: "2025", description: "1 BTC reaches $500K" },
      { year: "2027", description: "Widespread retail use", isActive: true },
    ],
    btcPrice: "21,105$",
    btcGrowth: "+28.21%",
    marketCap: "1.3trln$",
  },
};

const marketCapSeries = [56, 48, 38, 28, 20, 16, 14, 13, 12, 11, 10, 9].map((v, i) => ({ i, v }));

// ============ Card primitives ============
const cardBase =
  "rounded-3xl bg-[var(--surface-elevated)]/80 border border-[var(--card-border)] backdrop-blur-xl shadow-elev-2 hover:shadow-elev-3 hover:border-[var(--card-border-hover)] transition-all duration-300";

function SalesStatisticsCard({ data }: { data: SalesStatisticsData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`${cardBase} p-6 md:p-8 flex flex-col`}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[var(--text-primary)] text-lg font-bold">{data.title}</h3>
          <p className="text-[var(--text-muted)] text-sm">{data.subtitle}</p>
        </div>
        <button className="border border-[var(--card-border)] text-[var(--text-secondary)] px-3 py-1.5 rounded-full text-[10px] flex items-center gap-1.5 hover:border-[var(--card-border-hover)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-overlay)] transition-all">
          {data.period}
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--text-muted)] text-sm">Visitors</span>
            <span className="w-5 h-5 rounded-full bg-[var(--viz-3)] flex items-center justify-center animate-pulse-slow">
              <ArrowUp size={11} className="text-[var(--surface)]" />
            </span>
          </div>
          <p className="text-[var(--text-primary)] text-4xl font-extrabold metric-nums">{data.visitors.toLocaleString()}</p>
        </div>

        <div className="w-full sm:w-[230px] h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={CHART_GRID} />
              <XAxis dataKey="month" tick={{ fill: CHART_TICK, fontSize: 9 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis hide />
              <Tooltip cursor={{ fill: CHART_CURSOR }} content={<ChartTooltip />} />
              <Bar dataKey="value1" stackId="a" fill={VIOLET} maxBarSize={70} isAnimationActive animationDuration={800} animationEasing="ease-out" />
              <Bar dataKey="value2" stackId="a" fill={EMERALD} radius={[8, 8, 0, 0]} maxBarSize={70} isAnimationActive animationDuration={1000} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

function RecentTransactionsCard({ data }: { data: TransactionData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      className={`${cardBase} p-5 md:p-6`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--card-border)] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <ArrowLeftRight size={20} className="text-[var(--text-primary)]" />
          </div>
          <div>
            <h3 className="text-[var(--text-primary)] font-bold text-lg">{data.title}</h3>
            <p className="text-[var(--text-muted)] text-sm">{data.subtitle}</p>
          </div>
        </div>
        <div className="flex -space-x-3">
          {data.avatars.map((avatar, i) => (
            <img
              key={i}
              src={avatar}
              alt=""
              className="w-11 h-11 rounded-full border-2 border-[var(--surface-elevated)] object-cover hover:scale-110 hover:z-10 transition-transform cursor-pointer"
            />
          ))}
        </div>
      </div>

      <div className="bg-[var(--hover-overlay)] border border-[var(--card-border)] rounded-full px-4 py-3 flex items-center justify-between hover:bg-[var(--active-overlay)] transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
          <Wallet size={22} className="text-[var(--text-secondary)]" />
          <span className="text-[var(--text-secondary)] text-sm metric-nums">{data.amount}</span>
        </div>
        <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </motion.div>
  );
}

function CurrentBalanceCard({ data }: { data: BalanceData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
      className={`${cardBase} p-5 md:p-6 flex-1 flex flex-col`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[var(--text-primary)] font-bold text-lg">{data.title}</h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-[var(--hover-overlay)] border border-[var(--card-border)] flex items-center justify-center hover:bg-[var(--active-overlay)] hover:scale-110 transition-all">
            <ChevronLeft size={14} className="text-[var(--text-secondary)]" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[var(--hover-overlay)] border border-[var(--card-border)] flex items-center justify-center hover:bg-[var(--active-overlay)] hover:scale-110 transition-all">
            <ChevronRight size={14} className="text-[var(--text-secondary)]" />
          </button>
        </div>
      </div>

      <div className="rounded-[24px] p-5 relative overflow-hidden border border-[var(--viz-3)]/20 bg-gradient-to-br from-[var(--viz-3)]/15 to-transparent flex-1 flex flex-col">
        <div className="w-10 h-10 rounded-full bg-[var(--active-overlay)] border border-[var(--card-border)] flex items-center justify-center mb-4 hover:scale-110 transition-transform cursor-pointer">
          <TrendingUp size={18} className="text-[var(--text-primary)]" />
        </div>

        <div className="flex items-end justify-between gap-2 flex-1">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-primary)] font-bold text-xl metric-nums">{data.percentage}%</span>
              <div className="w-6 h-6 rounded-full bg-[var(--active-overlay)] border border-[var(--card-border)] flex items-center justify-center">
                <ArrowUpRight size={12} className="text-[var(--viz-3)]" />
              </div>
            </div>
            <p className="text-[var(--text-primary)]/60 text-xs mt-1">Avg score: {data.avgScore}</p>
          </div>

          <div className="relative">
            <svg width="220" height="150" viewBox="-5 5 165 105">
              <defs>
                <pattern id="gaugeStripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                </pattern>
              </defs>
              <path d="M 20 95 A 60 60 0 0 1 80 25" fill="none" stroke={EMERALD} strokeWidth="22" strokeLinecap="round" />
              <path d="M 80 25 A 60 60 0 0 1 140 95" fill="none" stroke="url(#gaugeStripes)" strokeWidth="22" strokeLinecap="round" />
              <circle cx="80" cy="25" r="6" fill={VIOLET} className="animate-pulse-slow" />
            </svg>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <p className="text-[var(--text-primary)] text-2xl font-bold metric-nums">{data.balance}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MarketForecastCard({ data }: { data: MarketForecastData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
      className={`${cardBase} p-5 md:p-6 flex-1`}
    >
      <div className="flex gap-4 h-full">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="absolute left-[23px] top-[24px] w-[2px] bg-[var(--active-overlay)]" style={{ height: 320 }} />

            <div className="flex items-start gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--viz-3)]/20 border border-[var(--viz-3)]/30 hover:scale-110 transition-transform cursor-pointer">
                <Smile size={22} className="text-[var(--viz-3)]" />
              </div>
              <h3 className="text-[var(--text-primary)] font-bold text-lg leading-tight pt-2">
                Market
                <br />
                forecast
              </h3>
            </div>

            {data.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 mb-8 last:mb-0 relative z-10 group/timeline"
              >
                <div className="w-12 flex justify-center flex-shrink-0">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all group-hover/timeline:scale-125 ${
                      item.isActive
                        ? "bg-[var(--viz-1)] border-[var(--viz-1)]"
                        : "bg-transparent border-[var(--card-border-hover)] group-hover/timeline:border-[var(--viz-3)]"
                    }`}
                  />
                </div>
                <div className="group-hover/timeline:translate-x-1 transition-transform">
                  <p className="text-[var(--text-primary)] font-bold text-sm">{item.year}</p>
                  <p className="text-[var(--text-muted)] text-xs leading-tight max-w-[100px]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-44 sm:w-52 flex flex-col gap-3 my-auto">
          <div className="rounded-[24px] p-4 aspect-square border border-[var(--viz-3)]/30 bg-gradient-to-br from-[var(--viz-3)]/15 to-transparent hover:scale-[1.02] transition-transform cursor-pointer flex flex-col">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[var(--text-primary)]/60 text-[10px]">BTC price</span>
              <ArrowUpRight size={14} className="text-[var(--text-primary)]" />
            </div>
            <p className="text-[var(--text-primary)] text-2xl font-bold metric-nums">{data.btcPrice}</p>
            <span className="text-[var(--viz-3)] text-xs">{data.btcGrowth}</span>

            <div className="mt-auto relative pt-6">
              <div className="absolute left-[60%] -top-1 -translate-x-1/2 z-10">
                <div className="w-4 h-4 rounded-full bg-[var(--viz-1)] animate-pulse-slow" />
              </div>
              <div className="absolute left-[60%] top-0 -translate-x-1/2 w-[1px] h-8 bg-[var(--card-border-hover)]" />
              <div className="w-full h-8 rounded-full border border-[var(--card-border)] bg-[var(--hover-overlay)] overflow-hidden flex">
                <div className="w-3/5 h-full relative">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <pattern id="btcStripes" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#btcStripes)" />
                  </svg>
                </div>
                <div className="flex-1 h-full" />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] p-4 aspect-square border border-[var(--viz-1)]/30 bg-gradient-to-br from-[var(--viz-1)]/20 to-transparent hover:scale-[1.02] transition-transform cursor-pointer flex flex-col">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[var(--text-primary)]/60 text-[10px]">Market cap forecast</span>
              <ArrowUpRight size={14} className="text-[var(--text-primary)]" />
            </div>
            <p className="text-[var(--text-primary)] text-2xl font-bold mb-2 metric-nums">{data.marketCap}</p>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketCapSeries} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mc-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={VIOLET} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={VIOLET} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<ChartTooltip />} cursor={false} />
                  <Area
                    type="monotone"
                    dataKey="v"
                    name="Forecast"
                    stroke={VIOLET}
                    strokeWidth={2.5}
                    fill="url(#mc-grad)"
                    dot={false}
                    activeDot={{ r: 4, fill: EMERALD, stroke: "#18181f", strokeWidth: 1 }}
                    isAnimationActive
                    animationDuration={900}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CryptoBentoDashboard({
  portfolio,
  className = "",
}: {
  portfolio?: CryptoPortfolio;
  className?: string;
}) {
  const p = portfolio ?? DEFAULT_PORTFOLIO;
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
        <div className="flex flex-col gap-4 md:gap-6">
          <SalesStatisticsCard data={p.sales} />
          <CurrentBalanceCard data={p.balance} />
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <RecentTransactionsCard data={p.transactions} />
          <MarketForecastCard data={p.forecast} />
        </div>
      </div>
    </div>
  );
}

export default CryptoBentoDashboard;
