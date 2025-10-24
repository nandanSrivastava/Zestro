"use client";

import React from "react";
import PropTypes from "prop-types";
import { logError } from "@/utils/errorHandling";

/**
 * Error Boundary component to catch and handle React errors gracefully
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    logError(error, {
      errorInfo,
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name,
    });

    this.setState({
      error,
      errorInfo,
    });

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(
          this.state.error,
          this.state.errorInfo,
          this.handleReset
        );
      }

      // Default fallback UI
      return (
        <div
          role="alert"
          style={{
            padding: "20px",
            border: "1px solid #ff6b6b",
            borderRadius: "8px",
            backgroundColor: "#fff5f5",
            color: "#c53030",
            textAlign: "center",
            margin: "20px",
          }}
        >
          <h2 style={{ marginBottom: "16px", fontSize: "18px" }}>
            Oops! Something went wrong
          </h2>
          <p style={{ marginBottom: "16px", color: "#666" }}>
            {this.props.message ||
              "We're sorry, but something unexpected happened. Please try refreshing the page."}
          </p>
          {this.props.showRetry && (
            <button
              onClick={this.handleReset}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3182ce",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Try Again
            </button>
          )}
          {process.env.NODE_ENV === "development" && (
            <details style={{ marginTop: "16px", textAlign: "left" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  marginTop: "8px",
                  padding: "12px",
                  backgroundColor: "#f7fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  fontSize: "12px",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  onError: PropTypes.func,
  onReset: PropTypes.func,
  message: PropTypes.string,
  showRetry: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
  showRetry: true,
};

export default ErrorBoundary;
