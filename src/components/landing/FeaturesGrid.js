"use client";

import React, { memo } from "react";
import {
  OrderIcon,
  InventoryIcon,
  StaffIcon,
  AnalyticsIcon,
} from "../ui/Icons";
import { FEATURES_DATA, FEATURES_CONFIG } from "../../utils/featuresData";

// Map feature IDs to their corresponding icons
const FEATURE_ICONS = {
  order: OrderIcon,
  inventory: InventoryIcon,
  staff: StaffIcon,
  analytics: AnalyticsIcon,
};

/**
 * Legacy/auxiliary Features grid (moved from Features.js)
 */
const FeaturesGrid = memo(() => {
  return (
    <section id="features-grid" className="container py-16 sm:py-20">
      <p className="mt-5 text-center text-[var(--zestro-orange-600)] max-w-3xl mx-auto mb-8 font-bold font-sans text-xl sm:text-2xl">
        {FEATURES_CONFIG.subtitle}
      </p>

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
                <h4
                  className={
                    "font-bold mb-2 text-[var(--zestro-orange-700)] w-full px-3 truncate whitespace-nowrap text-center " +
                    "text-lg sm:text-xl md:text-2xl"
                  }
                  title={feature.title}
                >
                  {feature.title}
                </h4>

                <p className="text-[color:rgba(15,23,42,0.85)] text-center text-sm sm:text-base md:text-lg w-full px-3 break-words leading-relaxed">
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

FeaturesGrid.displayName = "FeaturesGrid";

export default FeaturesGrid;
