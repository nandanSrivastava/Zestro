import React from "react";
import { PRICING_TIERS, PRICING_CONFIG } from "../../utils/pricingData";
import PricingCard from "../ui/PricingCard";

/* ------------------ Main Pricing Section ------------------ */
export default function Pricing() {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--zestro-orange-200)]/30 via-transparent to-[var(--zestro-orange-200)]/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--zestro-orange-200)]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--zestro-orange-200)]/15 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[var(--zestro-orange-600)] to-[var(--zestro-orange-700)] bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wide">
              Choose Your Plan
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--zestro-orange-700)] mb-6 leading-tight">
            {PRICING_CONFIG.title}
          </h2>
          <p className="text-center text-slate-600 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {PRICING_CONFIG.subtitle}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid - Vertical Layout */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {PRICING_TIERS.filter((t) => t.id !== "free").map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-4">Need a custom solution?</p>
          <button className="btn-outline hover:scale-105 transition-all duration-300">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
