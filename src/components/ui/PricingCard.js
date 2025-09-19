"use client";

import React, { memo } from "react";

/**
 * Reusable Check Icon for pricing features
 */
const CheckIcon = memo(() => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="w-4 h-4 text-[var(--zestro-orange-700)] flex-shrink-0 mt-1"
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

/* ------------------ CTA button style map ------------------ */
const CTA_CLASS_MAP = {
  primary: "btn-outline",
  accent: "btn-primary",
  secondary: "btn-outline",
};

/**
 * Individual pricing tier card component matching original main branch design
 * @param {Object} props - Component props
 * @param {Object} props.tier - Pricing tier data
 */
const PricingCard = memo(({ tier }) => {
  const isHighlighted = tier.badge || tier.id === "pro";
  const ctaClass =
    CTA_CLASS_MAP[tier.cta?.variant || tier.cta?.type] || "btn-outline";
  // Normalize button classes to match design: large pill buttons
  const baseBtnClasses =
    "w-full rounded-[28px] py-4 text-lg font-semibold transition-shadow";
  const accentExtra = "shadow-[0_10px_30px_rgba(255,115,55,0.15)]";
  const outlineExtra =
    "bg-white/60 border border-[var(--zestro-orange-200)] text-[var(--zestro-orange-700)]";
  const isFilledAccent = ctaClass === "btn-primary";
  const buttonClass = `${ctaClass} ${baseBtnClasses} ${
    isFilledAccent ? accentExtra : outlineExtra
  }`;
  return (
    <article
      aria-labelledby={`tier-${tier.id}-title`}
      className={`relative rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-300 ${
        isHighlighted ? "shadow-2xl z-10" : "shadow-lg"
      } hover:scale-[1.02]`}
    >
      {/* Header */}
      <header className="px-4 py-3 bg-gradient-to-r from-[var(--zestro-orange-700)] to-[var(--zestro-orange-600)] rounded-t-xl">
        <div className="flex items-center justify-between">
          <h3
            id={`tier-${tier.id}-title`}
            className="text-sm font-semibold text-white"
          >
            {tier.name}
          </h3>
          {tier.badge && (
            <span className="text-xs font-semibold bg-white px-3 py-1 rounded-full text-slate-900">
              {tier.badge}
            </span>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="p-4 glass-card flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline gap-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-900)] leading-none">
              {tier.price}
            </div>
            {tier.actualPrice && (
              <div className="text-sm text-slate-600 line-through mt-2">
                {tier.actualPrice}
              </div>
            )}
            {tier.freq && (
              <div className="text-sm text-slate-700">{tier.freq}</div>
            )}
          </div>

          {/* Perks */}
          <ul className="mt-4 space-y-2 text-sm text-slate-800">
            {tier.perks.map((perk, i) => (
              <li
                key={`${tier.id}-perk-${i}`}
                className="flex items-start gap-3"
              >
                <CheckIcon />
                <span className="leading-tight">{perk}</span>
              </li>
            ))}
          </ul>

          {/* Enterprise note */}
          {tier.id === "enterprise" && (
            <p className="mt-4 text-xs text-slate-600">
              Pricing is custom — final price will be decided after
              consultation.
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button type="button" className={buttonClass}>
            {tier.cta?.label || "Choose"}
          </button>
        </div>
      </div>
    </article>
  );
});

PricingCard.displayName = "PricingCard";

export default PricingCard;
