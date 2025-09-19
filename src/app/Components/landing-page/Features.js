import { memo } from "react";

function IconOrder(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M3 7h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="8"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 12h.01M12 12h.01M16 12h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconInventory(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M3 7l9-4 9 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconStaff(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconAnalytics(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M3 3v18h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 14v-4M12 14v-7M17 14v-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const features = [
  {
    id: "order",
    title: "Order Management",
    desc: "Track dine-in, takeout, and delivery orders seamlessly.",
    icon: <IconOrder className="w-12 h-12 text-[var(--zestro-orange-700)]" />,
  },
  {
    id: "inventory",
    title: "Inventory Control",
    desc: "Monitor stock levels and receive alerts for low inventory.",
    icon: (
      <IconInventory className="w-12 h-12 text-[var(--zestro-orange-700)]" />
    ),
  },
  {
    id: "staff",
    title: "Staff Scheduling",
    desc: "Manage shifts, payroll, and staff performance easily.",
    icon: <IconStaff className="w-12 h-12 text-[var(--zestro-orange-700)]" />,
  },
  {
    id: "analytics",
    title: "Analytics & Reports",
    desc: "Gain insights into sales, trends, and customer preferences.",
    icon: (
      <IconAnalytics className="w-12 h-12 text-[var(--zestro-orange-700)]" />
    ),
  },
];

function Features() {
  return (
    <section id="features" className="container py-16 sm:py-20">
      <p className="mt-5 text-center text-[var(--zestro-orange-600)] max-w-3xl mx-auto mb-8 font-bold font-sans text-xl sm:text-2xl">
        Building tools you’ll love — want early access? Join the waitlist.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f) => (
          <div
            key={f.id}
            className="relative rounded-2xl p-6 sm:p-8 flex flex-col items-center glass-card shadow-lg overflow-hidden"
          >
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4">{f.icon}</div>
              <h4 className="font-bold text-lg sm:text-xl mb-2 text-[var(--zestro-orange-700)]">
                {f.title}
              </h4>
              <p className="text-[color:rgba(15,23,42,0.85)] text-center text-base sm:text-lg">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(Features);
