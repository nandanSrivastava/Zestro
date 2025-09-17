

const features = [
  {
    title: "Order Management",
    desc: "Track dine-in, takeout, and delivery orders seamlessly.",
    icon: "🍽️"
  },
  {
    title: "Inventory Control",
    desc: "Monitor stock levels and receive alerts for low inventory.",
    icon: "📦"
  },
  {
    title: "Staff Scheduling",
    desc: "Manage shifts, payroll, and staff performance easily.",
    icon: "👨‍🍳"
  },
  {
    title: "Analytics & Reports",
    desc: "Gain insights into sales, trends, and customer preferences.",
    icon: "📊"
  }
];

import { memo } from 'react'

function Features() {
  return (
    <section id="features" className="container py-16 sm:py-20">
      <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--zestro-blue-800)] mb-6 pt-5 text-center drop-shadow-lg animate-fade-in">Coming Soon</h3>
      <p className="text-center text-[color:rgba(15,23,42,0.8)] max-w-2xl mx-auto mb-8">We're building powerful features that will change the way restaurants operate. Sign up to be the first to experience them.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="relative rounded-2xl p-6 sm:p-8 flex flex-col items-center glass-card shadow-lg overflow-hidden"
          >
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-4xl sm:text-5xl mb-4">{f.icon}</span>
              <h4 className="font-bold text-lg sm:text-xl mb-2 text-[var(--zestro-blue-700)]">{f.title}</h4>
              <p className="text-[color:rgba(15,23,42,0.85)] text-center text-base sm:text-lg">{f.desc}</p>
            </div>
            <div className="absolute bottom-4 z-20 text-sm text-[color:rgba(15,23,42,0.45)]">Teaser — details revealed after launch</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(Features)
