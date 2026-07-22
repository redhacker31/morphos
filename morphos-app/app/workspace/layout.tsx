import React from "react";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[var(--background)] overflow-hidden relative">
      {/* Background Effects */}
      <div className="bg-grid pointer-events-none" />
      <div className="bg-gradient-radial pointer-events-none" />

      {/* Shell */}
      <div className="relative z-10 flex w-full h-full">
        {children}
      </div>
    </div>
  );
}
