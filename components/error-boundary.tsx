// components/ErrorBoundary.tsx

import React, { Component, ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-red-100 text-red-800 border border-red-300 rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <p className="text-lg mb-4">Please try again later.</p>
          <button
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500 transition"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
