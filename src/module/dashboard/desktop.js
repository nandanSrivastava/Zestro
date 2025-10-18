"use client";

import React from "react";
import Sidebar from "@/module/dashboard/components/sidebar";
import styles from "./styles/Dashboard.module.css";

const DesktopDashboard = ({ children }) => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar initialCollapsed={false} />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>
    </div>
  );
};

export default DesktopDashboard;
