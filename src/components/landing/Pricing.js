import React from "react";
import { PRICING_TIERS, PRICING_CONFIG } from "../../utils/pricingData";
import PricingCard from "../ui/PricingCard";

/* ------------------ Main Pricing Section ------------------ */
export default function Pricing() {
  return (
    <section id="pricing" className="py-12">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-700)] mb-6 text-center">
          {PRICING_CONFIG.title}
        </h2>

        <p className="text-center text-slate-700 mb-8 max-w-2xl mx-auto">
          {PRICING_CONFIG.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {PRICING_TIERS.filter((t) => t.id !== "free").map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
