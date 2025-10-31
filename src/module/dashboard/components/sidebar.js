"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icons from "./SidebarIcons";
import Image from "next/image";
import styles from "../styles/Sidebar.module.css";

// Navigation items configuration
const navigationItems = [
  {
    id: "orders",
    label: "Orders",
    icon: "Dashboard",
    href: "/dashboard/orders",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    icon: "Tasks",
    href: "/dashboard/kitchen",
  },
  { id: "menu", label: "Menu", icon: "Projects", href: "/dashboard/menu" },
  {
    id: "reservations",
    label: "Reservations",
    icon: "Calendar",
    href: "/dashboard/reservations",
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: "Analytics",
    href: "/dashboard/inventory",
  },
  { id: "staff", label: "Staff", icon: "Team", href: "/dashboard/staff" },
  {
    id: "reports",
    label: "Reports",
    icon: "Analytics",
    href: "/dashboard/reports",
  },
];

const bottomNavigationItems = [
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    href: "/dashboard/settings",
  },
  {
    id: "support",
    label: "Help & Support",
    icon: "Help",
    href: "/dashboard/support",
  },
];

const Sidebar = ({ initialCollapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActiveLink = (href) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
      data-collapsed={isCollapsed}
    >
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          {!isCollapsed && (
            <div className={styles.logo}>
              <Image
                src="/images/zestro-logo.png"
                alt="Zestro"
                width={120}
                height={28}
                className={styles.logoImage}
              />
            </div>
          )}
          {isCollapsed && (
            <div className={styles.logoCollapsed}>
              <span className={styles.logoIcon}>Z</span>
            </div>
          )}
        </div>
        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navigationItems.map((item) => {
            const IconComponent = Icons[item.icon];
            const isActive = isActiveLink(item.href);

            return (
              <li key={item.id} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${
                    isActive ? styles.active : ""
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className={styles.navIcon}>
                    <IconComponent />
                  </span>
                  {!isCollapsed && (
                    <span className={styles.navLabel}>{item.label}</span>
                  )}
                  {isActive && <span className={styles.activeIndicator} />}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          <ul className={styles.navList}>
            {bottomNavigationItems.map((item) => {
              const IconComponent = Icons[item.icon];
              const isActive = isActiveLink(item.href);

              return (
                <li key={item.id} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      isActive ? styles.active : ""
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className={styles.navIcon}>
                      <IconComponent />
                    </span>
                    {!isCollapsed && (
                      <span className={styles.navLabel}>{item.label}</span>
                    )}
                    {isActive && <span className={styles.activeIndicator} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
