"use client";

import React, { memo } from "react";

/* ------------------------- Helpers ------------------------- */
function parseCurrencyValue(value) {
  if (value == null) return null;
  const digits = String(value).replace(/[^0-9]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function getCurrencySymbol(value, fallback = "₹") {
  if (!value) return fallback;
  const m = String(value).match(/[^0-9\s.,]+/);
  return m ? m[0] : fallback;
}

function formatNumberIndia(n) {
  try {
    return new Intl.NumberFormat("en-IN").format(n);
  } catch (e) {
    return String(n);
  }
}

/* ----------------------- Presentational --------------------- */
function PriceDisplay({ price, actualPrice, freq }) {
  const priceNum = parseCurrencyValue(price);
  const actualNum = parseCurrencyValue(actualPrice);
  const currency = getCurrencySymbol(price);
  const discount =
    priceNum && actualNum
      ? Math.round(((actualNum - priceNum) / actualNum) * 100)
      : null;

  if (priceNum) {
    return (
      <div className="flex items-baseline gap-3">
        <div className="flex items-baseline gap-2">
          Regular Price
          <span className="text-xl sm:text-2xl font-medium text-slate-700">
            {currency}
          </span>
          <span className="text-4xl sm:text-5xl font-extrabold text-[var(--zestro-orange-900)] leading-none">
            {formatNumberIndia(priceNum)}
          </span>
          {freq && (
            <span className="text-sm sm:text-base text-slate-700 ml-1">
              {freq}
            </span>
          )}
        </div>

        {actualPrice && (
          <div className="text-l text-slate-600 line-through mt-2">
          {actualPrice}
          </div>
        )}

        {discount ? (
          <div className="ml-auto">
            <span className="inline-block bg-[var(--zestro-orange-100)] text-[var(--zestro-orange-700)] text-xs px-2 py-1 rounded-full">
              Save {discount}%
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex items-baseline gap-3">
      <div className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-900)] leading-none">
        {price}
      </div>
      {freq && <div className="text-sm text-slate-700">{freq}</div>}
    </div>
  );
}

function ProOptions() {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="p-3 rounded-lg bg-white/60 border border-[var(--zestro-orange-100)] text-center">
        <div className="text-sm font-semibold text-slate-700">
          3 months free
        </div>
        <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--zestro-orange-900)]">
          ₹1,500<span className="text-sm text-slate-700">/month</span>
        </div>
        <div className="mt-1 text-xs text-slate-600">
          Billed monthly after trial
        </div>
        <div className="mt-3">
          <button
            type="button"
            className={`btn-primary w-full rounded-[24px] py-2 font-semibold text-sm`}
          >
            Start 3‑month trial
          </button>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white/60 border border-[var(--zestro-orange-100)] text-center">
        <div className="text-sm font-semibold text-slate-700">
          6‑month purchase
        </div>
        <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--zestro-orange-900)]">
          ₹1,000<span className="text-sm text-slate-700">/month</span>
        </div>
        <div className="mt-1 text-xs text-slate-600">
          Get 3 months free when you buy 6 months
        </div>
        <div className="mt-3">
          <button
            type="button"
            className={`btn-outline w-full rounded-[24px] py-2 font-semibold text-sm text-[var(--zestro-orange-700)]`}
          >
            Buy 6‑month plan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ CTA button style map ------------------ */
const CTA_CLASS_MAP = {
  primary: "btn-outline",
  accent: "btn-primary",
  secondary: "btn-outline",
};

/**
 * PricingCard
 */
const PricingCard = memo(({ tier }) => {
  const isHighlighted = Boolean(tier.badge || tier.id === "pro");
  const ctaClass =
    CTA_CLASS_MAP[tier.cta?.variant || tier.cta?.type] || "btn-outline";

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

      <div className="p-4 glass-card flex-1 flex flex-col justify-between">
        <div>
          <PriceDisplay
            price={tier.price}
            actualPrice={tier.actualPrice}
            freq={tier.freq}
          />

          {tier.id === "pro" ? (
            <ProOptions />
          ) : (
            tier.id === "enterprise" && (
              <p className="mt-4 text-sm text-slate-700">
                Pricing is custom — final price will be decided after
                consultation.
              </p>
            )
          )}
        </div>

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
