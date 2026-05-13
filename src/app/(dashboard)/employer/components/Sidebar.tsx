"use client";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { href: "/employer", label: "Dashboard" },
    { href: "/employer/jobs", label: "Jobs" },
    { href: "/employer/jobs/create", label: "Create Job" },
  ];

  const isActive = (href: string) => {
    if (href === "/employer") return pathname === "/employer";
    return pathname.startsWith(href);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Employer Panel</div>

      <nav className={styles.nav}>
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${isActive(item.href) ? styles.active : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
