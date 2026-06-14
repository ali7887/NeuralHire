 
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import styles from "./layout.module.css";

import { requireRole } from "@/lib/auth/require-role";

export default async function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["employer"]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        {/* ✅ role باید پاس داده شود */}
        <DashboardHeader role="employer" />

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
