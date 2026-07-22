"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState, type ReactNode } from "react";

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  // We use a mock URL for hackathon/presentation mode until the user runs `npx convex dev`
  const [convex] = useState(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "https://mock-url.convex.cloud")
  );

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
