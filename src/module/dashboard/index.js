"use client";

import React from "react";
import Sidebar from "@/module/dashboard/components/sidebar";
import styles from "./styles/Dashboard.module.css";

const Dashboard = ({ children }) => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>
    </div>
  );
};

export default Dashboard;
