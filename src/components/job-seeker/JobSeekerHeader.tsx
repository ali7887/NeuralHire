/* eslint-disable no-undef */
"use client";

import Link from "next/link";

export default function JobSeekerHeader() {
  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 32px",
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* LEFT SECTION */}
      <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Link
          href="/"
          style={{
            fontWeight: 700,
            fontSize: 20,
            color: "#1e293b",
            textDecoration: "none",
          }}
        >
          JobBoard
        </Link>

        <Link href="/job-seeker/jobs" style={{ color: "#334155", textDecoration: "none" }}>
          Browse Jobs
        </Link>

        <Link href="/job-seeker/applications" style={{ color: "#334155", textDecoration: "none" }}>
          My Applications
        </Link>

        <Link href="/job-seeker/resume" style={{ color: "#334155", textDecoration: "none" }}>
          Resume
        </Link>
      </nav>

      {/* RIGHT SECTION */}
      <button
        onClick={logout}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          background: "#f1f5f9",
          border: "1px solid #cbd5e1",
          color: "#475569",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
}
