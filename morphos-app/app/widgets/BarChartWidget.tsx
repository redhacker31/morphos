"use client";

import React, { useEffect, useRef, memo } from "react";

import type { WidgetProps } from "../engine/ComponentRegistry";

function BarChartWidget(props: WidgetProps) {
  const { title, labels, datasets, colors } = props as {
    title?: string; labels?: string[]; datasets?: { label: string; data: number[] }[]; colors?: string[];
  } & WidgetProps;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    let isMounted = true;
    
    import("chart.js/auto").then(({ default: Chart }) => {
      if (!isMounted || !canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();

      Chart.defaults.color = "#C9D1D9";
      Chart.defaults.font.family = "Inter";

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels ?? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: (datasets ?? [{ label: "Data", data: [65, 78, 90, 85, 110, 130, 142] }]).map((ds, i) => ({
            ...ds,
            backgroundColor: colors?.[i] ?? "#00C8FF",
            borderRadius: 4,
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 2000, easing: "easeOutQuart" },
          plugins: { legend: { display: (datasets?.length ?? 1) > 1 } },
          scales: {
            y: { grid: { color: "rgba(255,255,255,0.05)" } },
            x: { grid: { display: false } },
          },
        },
      });
    });

    return () => { 
      isMounted = false;
      if (chartRef.current) chartRef.current.destroy(); 
    };
  }, [labels, datasets, colors]);

  return (
    <div className="chart-card">
      <h3>{title ?? "Bar Chart"}</h3>
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default memo(BarChartWidget);
