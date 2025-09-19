"use client";

import React, { memo } from "react";

/**
 * Order Management Icon - Latest from main branch
 */
export const OrderIcon = memo(
  ({ className = "w-12 h-12 text-[var(--zestro-orange-700)]", ...props }) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3 7h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="8"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 12h.01M12 12h.01M16 12h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

/**
 * Inventory Control Icon - Latest from main branch
 */
export const InventoryIcon = memo(
  ({ className = "w-12 h-12 text-[var(--zestro-orange-700)]", ...props }) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3 7l9-4 9 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

/**
 * Staff Scheduling Icon - Latest from main branch
 */
export const StaffIcon = memo(
  ({ className = "w-12 h-12 text-[var(--zestro-orange-700)]", ...props }) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

/**
 * Analytics & Reports Icon - Latest from main branch
 */
export const AnalyticsIcon = memo(
  ({ className = "w-12 h-12 text-[var(--zestro-orange-700)]", ...props }) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3 3v18h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 14v-4M12 14v-7M17 14v-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

OrderIcon.displayName = "OrderIcon";
InventoryIcon.displayName = "InventoryIcon";
StaffIcon.displayName = "StaffIcon";
AnalyticsIcon.displayName = "AnalyticsIcon";
