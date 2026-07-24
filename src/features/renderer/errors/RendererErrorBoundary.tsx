
import React, { Component, type ReactNode } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Tier 2 Error Boundary - Catches pipeline/layout strategy crashes and renders AST recovery UI.
 */
export class RendererErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[RendererErrorBoundary Tier 2] Pipeline failure:`, error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full rounded-3xl bg-red-500/10 border border-red-500/40 p-8 text-center space-y-4 backdrop-blur-2xl">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 mx-auto flex items-center justify-center text-red-400">
            <ShieldAlert size={24} />
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Application Rendering Engine Exception</h3>
          <p className="text-xs text-red-300/80 max-w-md mx-auto">
            The Dynamic Renderer encountered an unexpected layout or AST processing error.
          </p>
          <div className="text-[10px] font-mono bg-[var(--hover-overlay)] text-red-400 p-3 rounded-xl border border-red-500/20 max-w-lg mx-auto truncate">
            {this.state.error?.message || "Unknown Renderer Exception"}
          </div>
          <button
            onClick={this.handleReload}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-white font-extrabold text-xs inline-flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-lg"
          >
            <RefreshCw size={14} /> Recover Renderer Frame
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
