/* eslint-disable no-undef */
"use client"

import Link from "next/link"

export default function JobSeekerHeader() {

  function logout(){
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        borderBottom: "1px solid #eee",
        marginBottom: "25px",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/" style={{ fontWeight: "bold", fontSize: "18px" }}>
          JobBoard
        </Link>

        <Link href="/job-seeker/jobs">Browse Jobs</Link>
        <Link href="/job-seeker/applications">My Applications</Link>
        <Link href="/job-seeker/resume">Resume</Link>
      </div>

      <button
        onClick={logout}
        style={{
          padding: "6px 12px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          background: "#fafafa",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  )
}
