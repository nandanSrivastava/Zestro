/**
 * Pricing data configuration - Latest from main branch
 */

export const PRICING_CONFIG = {
  title: "Pricing",
  subtitle:
    "Simple, transparent pricing designed to scale with your restaurant. No surprises, just results.",
  enterpriseNote:
    "Pricing is custom — final price will be decided after consultation.",
};

export const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: "Free",
    actualPrice: null,
    freq: null,
    perks: [
      "Up to 200 Orders Free",
      "Add Unlimited Table.",
      "Unlimited QR Generation.",
      "Up to 50 Products Onboarding.",
      "Add Free Email Marketing (Up to 200 Mails).",
      "Maximum 2 Users.",
    ],
    cta: {
      label: "Get Started — Free",
      variant: "primary",
      action: "signup",
    },
    badge: null,
  },
  {
    id: "pro",
    name: "Zestro-Pro",
    price: "₹1,999",
    actualPrice: "₹2,999",
    freq: "/month",
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
    cta: {
      label: "Get Pro",
      variant: "accent",
      action: "upgrade",
    },
    badge: "Recommended",
  },
  {
    id: "enterprise",
    name: "Zestro Infiny (Enterprise)",
    price: "Custom",
    actualPrice: null,
    freq: null,
    perks: [
      "All Zestro-Pro features",
      "Customize UI as per your needs",
      "Full white-label branding for your company",
      "Native iOS & Android apps with onboarding",
    ],
    cta: {
      label: "Request a Demo",
      variant: "secondary",
      action: "demo",
    },
    badge: null,
    note: "Pricing is custom — final price will be decided after consultation.",
  },
];
