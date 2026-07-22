"use client";

import React, { memo } from "react";
import type { WidgetProps } from "../engine/ComponentRegistry";

function TableWidget(props: WidgetProps) {
  const { title, headers, rows } = props as {
    title?: string; headers?: string[]; rows?: { id: string; cols: string[] }[];
  } & WidgetProps;

  const safeHeaders = headers ?? ["Column 1", "Column 2", "Column 3"];
  const safeRows = rows ?? [];

  return (
    <div className="table-card">
      <h3>{title ?? "Data Table"}</h3>
      {safeRows.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          <i className="ph ph-table" style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}></i>
          No data available
        </div>
      ) : (
        <table>
          <thead>
            <tr>{safeHeaders.map((h, i) => <th key={`${h}-${i}`}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {safeRows.map((row) => (
              <tr key={row.id}>
                {row.cols.map((col, i) => (
                  <td key={`${row.id}-col-${i}`}>
                    {["Complete", "Active", "Live", "Paid", "Success"].includes(col) ? (
                      <span className="status-badge success">{col}</span>
                    ) : col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default memo(TableWidget);
