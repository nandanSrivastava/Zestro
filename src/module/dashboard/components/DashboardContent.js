"use client";

import React from "react";
import styles from "../styles/DashboardContent.module.css";

const DashboardContent = () => {

  return (
    <div className={styles.dashboardContent}>
        <h1 className={styles.welcomeMessage}>Welcome to your Dashboard</h1>
    </div>
  );
};

export default DashboardContent;
