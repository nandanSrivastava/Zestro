/**
 * Features section configuration and data - Latest from main branch
 */

export const FEATURES_CONFIG = {
  title: null, // No title in latest version
  subtitle:
    "Building tools you'll love — want early access? Join the waitlist.",
  description: null,
};

export const FEATURES_DATA = [
  {
    id: "order",
    title: "Order Management",
    description:
      "Create and manage dine-in, takeaway and delivery orders with modifiers and notes.",
    category: "operations",
  },
  {
    id: "tables",
    title: "Table & Floorplan Integration",
    description:
      "Visual floorplan, table assignments and QR-based table ordering for faster service.",
    category: "operations",
  },
  {
    id: "menu",
    title: "Menu & Product Management",
    description:
      "Add products, categories, modifiers and pricing; bulk onboarding tools for menus.",
    category: "catalog",
  },
  {
    id: "inventory",
    title: "Inventory Control",
    description:
      "Track stock levels, manage suppliers, and receive low-stock alerts.",
    category: "management",
  },
  {
    id: "staff",
    title: "Staff Scheduling & Roles",
    description:
      "Shift scheduling, role-based access and simple payroll exports.",
    category: "hr",
  },
  {
    id: "payments",
    title: "Payments & Billing",
    description:
      "Flexible billing: split bills, accept card & digital payments, and print receipts.",
    category: "payments",
  },
  {
    id: "analytics",
    title: "Reporting & Analytics",
    description:
      "Sales reports, trends, and actionable insights to grow revenue.",
    category: "insights",
  },
  {
    id: "integrations",
    title: "Integrations & Branding",
    description:
      "Connect POS, accounting tools, and apply custom branding or white-labeling.",
    category: "platform",
  },
];

export const FEATURES_STYLING = {
  section: "container py-16 sm:py-20",
  container: "",
  header: "",
  title:
    "text-3xl sm:text-4xl font-extrabold text-[var(--zestro-orange-800)] mb-6 pt-5 text-center drop-shadow-lg animate-fade-in",
  subtitle:
    "text-center text-[color:rgba(15,23,42,0.8)] max-w-2xl mx-auto mb-8",
  description: "",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
  card: "relative rounded-2xl p-6 sm:p-8 flex flex-col items-center glass-card shadow-lg overflow-hidden",
  cardContent: "relative z-10 flex flex-col items-center",
  cardIcon: "text-4xl sm:text-5xl mb-4",
  cardTitle:
    "font-bold text-lg sm:text-xl mb-2 text-[var(--zestro-orange-700)]",
  cardDescription:
    "text-[color:rgba(15,23,42,0.85)] text-center text-base sm:text-lg",
  cardTeaser: "absolute bottom-4 z-20 text-sm text-[color:rgba(15,23,42,0.45)]",
};
