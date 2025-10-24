"use client";

import React, { memo } from "react";
import PropTypes from "prop-types";

/**
 * Accessible loading spinner component
 */
const LoadingSpinner = memo(function LoadingSpinner({
  size = "md",
  message = "Loading...",
  className = "",
  show = true,
}) {
  if (!show) return null;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const spinnerClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <svg
        className={`animate-spin text-blue-600 ${spinnerClass}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {message && (
        <span className="mt-2 text-sm text-gray-600 sr-only">{message}</span>
      )}
    </div>
  );
});

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  message: PropTypes.string,
  className: PropTypes.string,
  show: PropTypes.bool,
};

export default LoadingSpinner;
