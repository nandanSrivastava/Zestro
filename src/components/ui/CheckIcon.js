"use client";

import React, { memo } from "react";

/**
 * Reusable Check Icon component
 */
export const CheckIcon = memo(() => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="w-4 h-4 text-green-600 flex-shrink-0 mt-1"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

CheckIcon.displayName = "CheckIcon";
