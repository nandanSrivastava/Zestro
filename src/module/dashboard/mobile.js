"use client";

import React, { useState } from "react";
import Sidebar from "@/module/dashboard/components/sidebar";
import styles from "./styles/Dashboard.module.css";
import mobileStyles from "./styles/Mobile.module.css";

const MobileDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.dashboardLayout}>
      {/* Mobile Header */}
      <header className={mobileStyles.mobileHeader}>
        <button
          className={mobileStyles.menuButton}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <span className={mobileStyles.headerTitle}>Zestro</span>
        <div className={mobileStyles.headerSpacer}></div>
      </header>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className={mobileStyles.overlay} onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`${mobileStyles.mobileSidebar} ${
          isSidebarOpen ? mobileStyles.open : ""
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className={`${styles.mainContent} ${mobileStyles.mobileContent}`}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>
    </div>
  );
};

export default MobileDashboard;
