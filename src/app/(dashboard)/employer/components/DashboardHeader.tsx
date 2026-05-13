"use client";

import styles from "./DashboardHeader.module.css";

export default function DashboardHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div>
          <h1 className={styles.title}>Employer Dashboard</h1>
          <p className={styles.subtitle}>
            Manage jobs, applicants and hiring activity
          </p>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.company}>
          <span className={styles.companyName}>Acme Inc.</span>
          <span className={styles.role}>Employer</span>
        </div>

        <div className={styles.avatar}>E</div>
      </div>
    </header>
  );
}
