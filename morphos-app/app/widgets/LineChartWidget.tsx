"use client";

import React, { useEffect, useRef, memo } from "react";

import type { WidgetProps } from "../engine/ComponentRegistry";

function LineChartWidget(props: WidgetProps) {
  const { title, labels, datasets, color } = props as {
    title?: string; labels?: string[]; datasets?: { label: string; data: number[] }[]; color?: string;
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

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      const c = color ?? "#00C8FF";
      gradient.addColorStop(0, c + "80");
      gradient.addColorStop(1, c + "00");

      const chartDatasets = (datasets ?? [{ label: "Data", data: [65, 78, 90, 85, 110, 130, 142] }]).map((ds) => ({
        ...ds,
        borderColor: c,
        backgroundColor: gradient,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: c,
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      }));

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels ?? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: chartDatasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 2000, easing: "easeOutQuart" },
          plugins: { legend: { display: chartDatasets.length > 1 } },
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
  }, [labels, datasets, color]);

  return (
    <div className="chart-card">
      <h3>{title ?? "Line Chart"}</h3>
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default memo(LineChartWidget);
