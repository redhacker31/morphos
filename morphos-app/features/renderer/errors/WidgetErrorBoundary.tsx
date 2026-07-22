"use client";

import React, { Component, type ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  widgetId: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Tier 1 Error Boundary - Catches single widget crashes without affecting adjacent widgets.
 */
export class WidgetErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[WidgetErrorBoundary Tier 1] Crash in widget ${this.props.widgetId}:`, error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[140px] rounded-2xl bg-red-500/10 border border-red-500/30 p-4 backdrop-blur-xl text-red-200 text-xs flex flex-col justify-between items-center text-center space-y-2">
          <AlertCircle size={20} className="text-red-400" />
          <div className="font-bold text-white">Widget Preview Unavailable</div>
          <div className="text-[10px] text-red-300/80 truncate max-w-full font-mono">
            {this.state.error?.message || "Render exception"}
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white text-[10px] font-bold cursor-pointer transition-colors"
          >
            <RotateCcw size={11} /> Reset Widget
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
