 
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  role: "admin" | "employer" | "job-seeker";
};

export default function DashboardHeader({ role }: Props) {
  const router = useRouter();

  const dashboardPath =
    role === "admin"
      ? "/admin"
      : role === "employer"
      ? "/employer"
      : "/job-seeker";

  const jobsPath =
    role === "employer"
      ? "/employer/jobs"
      : "/jobs";

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div style={wrapper}>
      <div style={left}>
        <span style={logo}>JobBoard</span>

        <Link href="/" style={link}>
          Home
        </Link>

        <Link href={dashboardPath} style={link}>
          Dashboard
        </Link>

        <Link href={jobsPath} style={link}>
          Jobs
        </Link>
      </div>

      <div style={right}>
        <span style={roleBadge}>{role}</span>

        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

/* ✅ Styles */

const wrapper = {
  width: "100%",
  height: "64px",
  background: "#ffffff",
  borderBottom: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 40px",
  marginBottom: "30px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const logo = {
  fontWeight: 700,
  fontSize: 18,
  marginRight: 20,
};

const link = {
  textDecoration: "none",
  color: "#444",
  fontWeight: 500,
};

const roleBadge = {
  background: "#eef2ff",
  color: "#4338ca",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: 12,
  textTransform: "capitalize" as const,
};

const logoutBtn = {
  padding: "8px 14px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
