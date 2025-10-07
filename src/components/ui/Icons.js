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
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 2.5h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        transform="translate(0 3)"
      />
      <path
        d="M8 10h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 13.5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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
      <rect
        x="3.5"
        y="6"
        width="17"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 10.5h17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.5 6v-1.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1V6"
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
        d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 20c0-3 2.7-5.5 6-5.5h3c3.3 0 6 2.5 6 5.5"
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
        d="M4 20h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="5.5"
        y="10"
        width="3"
        height="10"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="10.5"
        y="6"
        width="3"
        height="14"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="15.5"
        y="2"
        width="3"
        height="18"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
);

OrderIcon.displayName = "OrderIcon";
InventoryIcon.displayName = "InventoryIcon";
StaffIcon.displayName = "StaffIcon";
AnalyticsIcon.displayName = "AnalyticsIcon";

/**
 * Table / Floorplan Icon
 */
export const TableIcon = memo(
  ({ className = "w-12 h-12 text-[var(--zestro-orange-700)]", ...props }) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
);

/**
 * Menu / Product Icon
 */
export const MenuIcon = memo(
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
        d="M7 6h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 12h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 18h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="4.5" cy="6" r="1" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1" fill="currentColor" />
      <circle cx="4.5" cy="18" r="1" fill="currentColor" />
    </svg>
  )
);

/**
 * Payments Icon
 */
export const PaymentsIcon = memo(
  ({ className = "w-12 h-12 text-[var(--zestro-orange-700)]", ...props }) => (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        x="3.5"
        y="7"
        width="17"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="6" y="10.5" width="5" height="2" rx="0.5" fill="currentColor" />
      <circle
        cx="17.5"
        cy="12.5"
        r="1.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
);

/**
 * Integrations / API Icon
 */
export const IntegrationsIcon = memo(
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
        d="M7 7l-3 3v4a2 2 0 0 0 2 2h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 7l3 3v4a2 2 0 0 1-2 2h-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
);

TableIcon.displayName = "TableIcon";
MenuIcon.displayName = "MenuIcon";
PaymentsIcon.displayName = "PaymentsIcon";
IntegrationsIcon.displayName = "IntegrationsIcon";
