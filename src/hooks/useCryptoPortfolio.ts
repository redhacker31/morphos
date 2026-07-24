import { useCallback, useEffect, useState } from "react";
import { sb } from "@/lib/db";
import {
  DEFAULT_PORTFOLIO,
  type CryptoPortfolio,
} from "@/components/dashboard/CryptoBentoDashboard";

export interface CryptoPortfolioRow {
  id: string;
  payload: CryptoPortfolio;
  updated_at: string;
}

/** Merge a (possibly partial) stored payload over the canonical defaults. */
function mergeDefaults(payload: Partial<CryptoPortfolio> | null | undefined): CryptoPortfolio {
  if (!payload) return DEFAULT_PORTFOLIO;
  return {
    sales: { ...DEFAULT_PORTFOLIO.sales, ...(payload.sales ?? {}) },
    transactions: { ...DEFAULT_PORTFOLIO.transactions, ...(payload.transactions ?? {}) },
    balance: { ...DEFAULT_PORTFOLIO.balance, ...(payload.balance ?? {}) },
    forecast: { ...DEFAULT_PORTFOLIO.forecast, ...(payload.forecast ?? {}) },
  };
}

/**
 * useCryptoPortfolio — reads the current user's crypto bento payload from the
 * `crypto_portfolio` table (RLS-scoped to the user). On first load it seeds a
 * default row so the dashboard has persisted data; ownership is set
 * server-side by the set_owner_uid trigger, never by the client.
 */
export function useCryptoPortfolio(enabled = true) {
  const [portfolio, setPortfolio] = useState<CryptoPortfolio | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      let res = await sb.from("crypto_portfolio").select("id, payload, updated_at").maybeSingle();
      if (!res.data) {
        // First load: seed a row for this user. RLS + trigger handle ownership.
        await sb.from("crypto_portfolio").insert({ payload: DEFAULT_PORTFOLIO });
        res = await sb.from("crypto_portfolio").select("id, payload, updated_at").maybeSingle();
      }
      setPortfolio(mergeDefaults(res.data?.payload as CryptoPortfolio | undefined));
    } catch {
      setPortfolio(DEFAULT_PORTFOLIO);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) refresh();
  }, [refresh, enabled]);

  return { portfolio, loading, refresh };
}
