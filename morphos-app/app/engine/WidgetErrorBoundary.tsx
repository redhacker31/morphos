"use client";

import React, { Component, type ReactNode } from "react";

interface Props {
  widgetId: string;
  widgetType: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class WidgetErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[MorphOS] Widget "${this.props.widgetId}" (${this.props.widgetType}) crashed:`, error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: "rgba(255, 77, 77, 0.06)",
          border: "1px solid rgba(255, 77, 77, 0.2)",
          borderRadius: "16px",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <i className="ph ph-warning" style={{ color: "#FF4D4D", fontSize: "1.25rem" }}></i>
            <strong style={{ color: "#FF4D4D", fontSize: "0.9rem" }}>
              Widget Error: {this.props.widgetType}
            </strong>
          </div>
          <p style={{ color: "#A1A1AA", fontSize: "0.8rem" }}>
            {this.state.error?.message ?? "An unexpected error occurred."}
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              alignSelf: "flex-start",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            <i className="ph ph-arrow-clockwise" style={{ marginRight: "0.4rem" }}></i>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
