"use client";

import React, { useEffect, useRef, memo } from "react";

import type { WidgetProps } from "../engine/ComponentRegistry";

function PieChartWidget(props: WidgetProps) {
  const { title, labels, data, colors } = props as {
    title?: string; labels?: string[]; data?: number[]; colors?: string[];
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
        type: "pie",
        data: {
          labels: labels ?? ["Category A", "Category B", "Category C"],
          datasets: [{
            data: data ?? [40, 35, 25],
            backgroundColor: colors ?? ["#00C8FF", "#39FF14", "#FF8A00", "#FF4D4D"],
            borderWidth: 0,
            hoverOffset: 10,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 2000, easing: "easeOutQuart" },
          plugins: { legend: { position: "right" } },
        },
      });
    });

    return () => { 
      isMounted = false;
      if (chartRef.current) chartRef.current.destroy(); 
    };
  }, [labels, data, colors]);

  return (
    <div className="chart-card">
      <h3>{title ?? "Pie Chart"}</h3>
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default memo(PieChartWidget);
