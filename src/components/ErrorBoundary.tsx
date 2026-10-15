import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    if (
      error.message?.includes('MetaMask') ||
      error.stack?.includes('chrome-extension://')
    ) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (
      error.message?.includes('MetaMask') ||
      error.stack?.includes('chrome-extension://')
    ) {
      return;
    }
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-[#D9E2EC] p-8 max-w-md w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-100 text-[#B42318] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-heading font-black text-[#102A43]">
              Something went wrong
            </h2>
            <p className="text-xs text-[#627D98] leading-relaxed">
              An unexpected error occurred while rendering the page. Please refresh to continue browsing our furniture catalogue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#102A43] hover:bg-[#243B53] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
