import React, { memo } from "react";

const TIERS = [
  {
    id: "free",
    name: "Free",
    price: "Free",
    perks: [
      "Up to 200 Orders Free",
      "Add Unlimited Table.",
      "Unlimited QR Generation.",
      "Up to 50 Products Onboarding.",
      "Add Free Email Marketing (Up to 200 Mails).",
      "Maximum 2 Users.",
    ],
    cta: { label: "Get Started — Free", type: "primary" },
  },
  {
    id: "pro",
    name: "Zestro-Pro",
    price: "₹1,499",
    actualPrice: "₹2,999",
    freq: "/mo",
    perks: [
      "Everything in Free",
      "Unlimited Orders.",
      "Unlimited Products Onboarding.",
      "Unlimited Emails (Up to 10,000 Mails).",
      "Unlimited Users Onboarding.",
      "Staff scheduling.",
      "Advanced reports & analytics.",
      "Personal branding options (logo, description)",
    ],
    cta: { label: "Get Pro", type: "accent" },
    badge: "Recommended",
  },
  {
    id: "enterprise",
    name: "Zestro Infiny (Enterprise)",
    price: "Custom",
    perks: [
      "All Zestro-Pro features",
      "Customize UI as per your needs",
      "Full white-label branding for your company",
      "Native iOS & Android apps with onboarding",
    ],
    cta: { label: "Request a Demo", type: "secondary" },
  },
];

/* ------------------ CTA button style map ------------------ */
const CTA_CLASS_MAP = {
  primary: "btn-outline",
  accent: "btn-primary",
  secondary: "btn-outline",
};

/* ------------------ Reusable Check Icon ------------------ */
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

/* ------------------ Tier Card ------------------ */
const TierCard = memo(({ tier }) => {
  const isHighlighted = tier.badge || tier.id === "pro";
  const ctaClass = CTA_CLASS_MAP[tier.cta?.type] || "btn-outline";

  return (
    <article
      aria-labelledby={`tier-${tier.id}-title`}
      className={`relative rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-300 ${
        isHighlighted ? "shadow-2xl z-10" : "shadow-lg"
      } hover:scale-[1.02]`}
    >
      {/* Header */}
      <header className="px-4 py-3 bg-gradient-to-r from-[var(--zestro-orange-700)] to-[var(--zestro-orange-600)]">
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
          <div className="flex items-baseline gap-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-900)]">
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
              <li key={`${tier.id}-perk-${i}`} className="flex items-start gap-3">
                <CheckIcon />
                <span className="leading-tight">{perk}</span>
              </li>
            ))}
          </ul>

          {/* Enterprise note */}
          {tier.id === "enterprise" && (
            <p className="mt-4 text-xs text-slate-600">
              Pricing is custom — final price will be decided after consultation.
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <button type="button" className={`w-full ${ctaClass}`}>
            {tier.cta?.label || "Choose"}
          </button>
        </div>
      </div>
    </article>
  );
});

/* ------------------ Main Pricing Section ------------------ */
export default function Pricing() {
  return (
    <section id="pricing" className="py-12">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-700)] mb-6 text-center">
          Pricing
        </h2>

        <p className="text-center text-slate-700 mb-8 max-w-2xl mx-auto">
          Simple, transparent pricing designed to scale with your restaurant.
          No surprises, just results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
