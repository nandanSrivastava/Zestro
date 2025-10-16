"use client";

import React, { memo } from "react";

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

function PriceDisplay({ price, actualPrice, freq }) {
  const priceNum = parseCurrencyValue(price);
  const actualNum = parseCurrencyValue(actualPrice);
  const currency = getCurrencySymbol(price);
  const discount =
    priceNum && actualNum
      ? Math.round(((actualNum - priceNum) / actualNum) * 100)
      : null;

  if (!priceNum) {
    return null;
  }

  return (
    <div className="pricing-display">
      {/* Main Price - Stacked layout for narrow space */}
      <div className="text-center lg:text-left mb-2">
        <div className="flex items-baseline justify-center lg:justify-start gap-1">
          <span className="text-xl lg:text-lg font-bold text-white/90">
            {currency}
          </span>
          <span className="text-4xl lg:text-4xl font-black text-white leading-none">
            {formatNumberIndia(priceNum)}
          </span>
          {freq && (
            <span className="text-base lg:text-base text-white/80 font-medium">
              {freq}
            </span>
          )}
        </div>
      </div>

      {/* Discount Badge */}
      {discount && (
        <div className="flex justify-center lg:justify-start mb-2">
          <span className="inline-flex items-center gap-1 bg-white/25 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-full border border-white/30">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Save {discount}%
          </span>
        </div>
      )}

      {/* Regular Price */}
      {actualPrice && (
        <div className="text-center lg:text-left">
          <div className="text-sm lg:text-xs text-white/70 mb-1 w-max mx-auto lg:mx-0">
            Regular price:
          </div>
          <div className="text-base lg:text-sm text-white/80 line-through font-medium w-max mx-auto lg:mx-0">
            {actualPrice}
          </div>
        </div>
      )}
    </div>
  );
}

function PlanOptionCard({
  type,
  price,
  frequency,
  description,
  buttonText,
  buttonClass,
  isRecommended = false,
  onClick,
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--zestro-orange-600)] to-[var(--zestro-orange-700)] rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
      <div className="relative p-6 rounded-2xl bg-white/95 group-hover:bg-gradient-to-br group-hover:from-white/95 group-hover:to-[var(--zestro-orange-200)]/30 backdrop-blur-sm text-center border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[var(--zestro-orange-600)] to-[var(--zestro-orange-700)] text-white shadow-lg">
            {type}
          </span>
        </div>
        <div className="mb-1">
          <span className="text-2xl font-black text-slate-800">{price}</span>
          <span className="text-sm text-slate-600 font-semibold">
            {frequency}
          </span>
        </div>
        <div className="text-xs text-slate-600 mb-4 font-medium">
          {description}
        </div>
        <button type="button" className={buttonClass} onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function ProOptions({ onOpen }) {
  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left mb-6">
        <h4 className="text-xl font-bold text-slate-800 mb-2">
          Choose Your Plan
        </h4>
        <p className="text-slate-600">
          Select the option that works best for your restaurant
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <PlanOptionCard
          type="🎉 FREE TRIAL"
          price="₹1,500"
          frequency="/month"
          description="Your First 3 Months Are On Us! Enjoy now, subscribe later."
          buttonText="Start Free Trial"
          buttonClass="btn-outline w-full rounded-full py-3 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={onOpen}
        />
        <PlanOptionCard
          type="💰 BEST VALUE"
          price="₹1,000"
          frequency="/month"
          description="Best Deal: Unlock 6 Months by Paying for Just 3!"
          buttonText="Buy 6-Month Plan"
          buttonClass="btn-primary w-full rounded-full py-3 font-bold text-sm hover:shadow-lg transition-all duration-300 border-[var(--zestro-orange-400)] text-[var(--zestro-orange-700)]"
          isRecommended={true}
          onClick={onOpen}
        />
      </div>
    </div>
  );
}

function TierTitle({ tier }) {
  const getTitleClasses = () => {
    if (tier.id === "enterprise") {
      return "text-xl lg:text-2xl";
    }
    return tier.badge || tier.id === "pro"
      ? "text-2xl lg:text-4xl"
      : "text-2xl lg:text-3xl";
  };

  if (tier.id === "enterprise") {
    const name = String(tier.name || "");
    const regex = /(\(Enterprise Edition\))/i;
    const parts = name.split(regex).filter(Boolean);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span
              key={index}
              className="block text-sm lg:text-base font-semibold"
            >
              {part.trim()}
            </span>
          ) : (
            <span
              key={index}
              className="block text-2xl lg:text-4xl font-black leading-tight"
            >
              {part.trim()}
            </span>
          )
        )}
      </>
    );
  }

  return tier.name;
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
function useCardStyles(tier) {
  const isHighlighted = Boolean(tier.badge || tier.id === "pro");
  const ctaClass =
    CTA_CLASS_MAP[tier.cta?.variant || tier.cta?.type] || "btn-outline";

  const baseBtnClasses =
    "w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105";
  const accentExtra =
    "shadow-[0_8px_25px_rgba(255,90,26,0.3)] hover:shadow-[0_12px_35px_rgba(255,90,26,0.4)]";
  const outlineExtra =
    "bg-white/90 backdrop-blur-sm border-2 border-[var(--zestro-orange-300)] text-[var(--zestro-orange-700)] hover:border-[var(--zestro-orange-500)] hover:shadow-lg";
  const isFilledAccent = ctaClass === "btn-primary";

  const buttonClass = `${ctaClass} ${baseBtnClasses} ${
    isFilledAccent ? accentExtra : outlineExtra
  }`;

  const leftBgClass =
    tier.id === "enterprise" || isHighlighted
      ? "bg-[var(--zestro-orange-700)]"
      : "bg-white";
  const leftTextClass = "text-white";
  const leftHoverGradient =
    tier.id === "enterprise" || isHighlighted
      ? "group-hover:bg-gradient-to-br group-hover:from-[var(--zestro-orange-700)] group-hover:to-[var(--zestro-orange-600)]"
      : "group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-[var(--zestro-orange-50)]";

  return {
    isHighlighted,
    buttonClass,
    leftBgClass,
    leftTextClass,
    leftHoverGradient,
  };
}

const PricingCard = memo(({ tier, index, onOpenWaitlist }) => {
  const {
    isHighlighted,
    buttonClass,
    leftBgClass,
    leftTextClass,
    leftHoverGradient,
  } = useCardStyles(tier);

  return (
    <article
      aria-labelledby={`tier-${tier.id}-title`}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] pricingCard ${
        isHighlighted
          ? "shadow-2xl shadow-[var(--zestro-orange-600)]/25 ring-[var(--zestro-orange-300)] bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-[var(--zestro-orange-200)]/20"
          : "shadow-sm shadow-slate-200/80 bg-white border border-slate-100"
      }`}
      // animation handled by CSS in Pricing.module.css via nth-child
    >
      {/* Enhanced glow effect for highlighted card */}
      {isHighlighted && (
        // Glow is hidden by default and fades in on hover
        <div className="absolute -inset-2 bg-gradient-to-r from-[var(--zestro-orange-500)] via-[var(--zestro-orange-600)] to-[var(--zestro-orange-500)] rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
      )}

      {/* Card Content - Horizontal Layout */}
      <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch min-h-[260px]">
        {/* Left Section - Plan Info */}
        <div
          className={`${
            isHighlighted ? "lg:flex-[3]" : "flex-1"
          } w-full p-8 lg:p-10 text-center lg:text-left ${leftBgClass} ${leftHoverGradient} ${leftTextClass} relative overflow-hidden flex flex-col items-center lg:items-start justify-center lg:rounded-l-3xl`}
        >
          {/* Decorative elements - smaller for compact layout */}
          {/* Removed top-right circular blur to avoid visual rounding of orange edge */}
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full blur-lg transform -translate-x-8 translate-y-8"></div>

          <div className="relative z-10 space-y-3">
            {/* Plan Name and Badge - Stacked for narrow layout */}
            <div className="space-y-2">
              <h3
                id={`tier-${tier.id}-title`}
                className="font-black tracking-tight leading-tight text-center lg:text-left"
              >
                <TierTitle tier={tier} />
              </h3>
              {tier.badge && (
                <div className="flex justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-1 text-xs font-black bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full text-slate-900 shadow-lg max-w-[90%] truncate justify-center">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {tier.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Compact Price Display */}
            <div className="space-y-1">
              <PriceDisplay
                price={tier.price}
                actualPrice={tier.actualPrice}
                freq={tier.freq}
              />
            </div>

            {tier.id === "enterprise" && (
              <div className="p-3 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">
                <div className="flex items-start gap-2 text-left">
                  <svg
                    className="w-4 h-4 text-yellow-300 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs text-white/90 font-medium leading-relaxed">
                    Custom pricing after consultation
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Options and CTA */}
        <div
          className={`${
            isHighlighted ? "lg:flex-[7]" : "flex-1"
          } p-8 lg:p-10 flex flex-col justify-center bg-white/95 group-hover:bg-gradient-to-br group-hover:from-white/95 group-hover:to-white/80 backdrop-blur-sm rounded-b-3xl lg:rounded-r-3xl`}
        >
          {tier.id === "pro" ? (
            <ProOptions onOpen={onOpenWaitlist} />
          ) : (
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <h4 className="text-xl font-bold text-slate-800 mb-4">
                  Ready to get started?
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {tier.id === "enterprise"
                    ? "Schedule a consultation to discuss your custom requirements and get a personalized quote."
                    : "Join thousands of restaurants already using Zestro to streamline their operations."}
                </p>
              </div>

              <div className="flex justify-center lg:justify-start">
                <button
                  type="button"
                  className={buttonClass}
                  onClick={() => {
                    // If this tier's CTA requests a demo, open the waitlist modal
                    if (tier.cta?.action === "demo") {
                      onOpenWaitlist?.();
                      return;
                    }
                    // Otherwise, fallback to opening waitlist when provided
                    onOpenWaitlist?.();
                  }}
                >
                  <span className="flex items-center justify-center gap-3">
                    {tier.cta?.label || "Choose"}
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
});

PricingCard.displayName = "PricingCard";

export default PricingCard;
