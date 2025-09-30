import React from "react";
import Sidebar from "../../components/common/Sidebar";
import Button from "../../components/common/Button";

import styles from "./dashboard.module.css";

const NAV_ITEMS = [
  { label: "Overview", icon: "🏠" },
  { label: "Orders", icon: "📦" },
  { label: "Menus", icon: "🍽️" },
  { label: "Customers", icon: "👥" },
  { label: "Settings", icon: "⚙️" },
];

const STATS = [
  { key: "totalOrders", label: "Total Orders", value: 1234 },
  { key: "activeMenus", label: "Active Menus", value: 12 },
  { key: "newCustomers", label: "New Customers", value: 87 },
  { key: "revenue", label: "Revenue", value: 24560, currency: true },
];

export const metadata = {
  title: "Zestro — Dashboard",
  description: "Dashboard — Zestro admin overview",
};

const numberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatValue(stat) {
  if (stat.currency) return currencyFormatter.format(stat.value);
  return numberFormatter.format(stat.value);
}

export default function Page() {
  return (
    <div className={styles.root}>
      <Sidebar items={NAV_ITEMS} />

      <main className={styles.main} aria-labelledby="dashboard-title">
        <header className={styles.header}>
          <h1 id="dashboard-title" className={styles.title}>
            Dashboard
          </h1>
          <div className={styles.actions}>
            <Button variant="outline" size="md" aria-label="Create new report">
              New Report
            </Button>
            <Button variant="primary" size="md" aria-label="Create item">
              Create
            </Button>
          </div>
        </header>

        <section className={styles.grid} aria-label="Overview cards">
          {STATS.map((stat) => (
            <article
              key={stat.key}
              className={styles.card}
              aria-labelledby={`${stat.key}-title`}
            >
              <h2 id={`${stat.key}-title`} className={styles.cardTitle}>
                {stat.label}
              </h2>
              <p className={styles.cardValue}>{formatValue(stat)}</p>
            </article>
          ))}
        </section>

        <section className={styles.tableSection}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <div className={styles.tablePlaceholder} role="status">
            Table placeholder
          </div>
        </section>
      </main>
    </div>
  );
}
