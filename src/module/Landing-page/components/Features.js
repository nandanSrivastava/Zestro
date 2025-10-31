"use client";

import React, { memo } from "react";
import {
  OrderIcon,
  InventoryIcon,
  StaffIcon,
  AnalyticsIcon,
  TableIcon,
  MenuIcon,
  PaymentsIcon,
  IntegrationsIcon,
} from "../components/Icons";
import { FEATURES_DATA, FEATURES_CONFIG } from "../../../utils/featuresData";

// Map feature IDs to their corresponding icons
const FEATURE_ICONS = {
  order: OrderIcon,
  inventory: InventoryIcon,
  staff: StaffIcon,
  analytics: AnalyticsIcon,
  tables: TableIcon,
  menu: MenuIcon,
  payments: PaymentsIcon,
  integrations: IntegrationsIcon,
};

/**
 * Features grid: show clear, distinct product features for people to read.
 */
const Features = memo(() => {
  return (
    <section
      id="features"
      className="container py-16 sm:py-20 bg-[var(--background)]"
    >
      <header className="mb-8 text-center mt-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-700)]">
          Our Product features
        </h2>
        <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
          The core capabilities your restaurant team will use every day.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES_DATA.map((feature) => {
          const IconComponent = FEATURE_ICONS[feature.id];

          return (
            <div
              key={feature.id}
              className="relative rounded-2xl p-6 sm:p-8 flex flex-col items-center glass-card shadow-lg overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4">{IconComponent && <IconComponent />}</div>
                <h4 className="font-bold text-lg sm:text-xl mb-2 text-[var(--zestro-orange-700)]">
                  {feature.title}
                </h4>
                <p className="text-[color:rgba(15,23,42,0.85)] text-center text-base sm:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

Features.displayName = "Features";

export default Features;
