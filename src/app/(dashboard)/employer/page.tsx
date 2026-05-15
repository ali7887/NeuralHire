/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, getJobs } from "@/lib/mockJobs";

export default function EmployerDashboardPage() {
  const [stats, setStats] = useState({
    activeJobs: 0,
    applications: 0,
    draftJobs: 0,
  });

  const [recentJobs, setRecentJobs] = useState<any[]>([]);

  useEffect(() => {
    setStats(getDashboardStats());
    setRecentJobs(getJobs().slice(0, 3));
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "20px", marginBottom: 24 }}>
        Overview
      </h2>

      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div style={card}>
          Active Jobs
          <br />
          <strong>{stats.activeJobs}</strong>
        </div>

        <div style={card}>
          Applications
          <br />
          <strong>{stats.applications}</strong>
        </div>

        <div style={card}>
          Draft Jobs
          <br />
          <strong>{stats.draftJobs}</strong>
        </div>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>Quick Actions</h3>

        <div style={{ display: "flex", gap: 12 }}>
          <a href="/employer/jobs/create" style={primary}>
            Create Job
          </a>

          <a href="/employer/jobs" style={secondary}>
            View Jobs
          </a>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 16 }}>Recent Jobs</h3>

        {recentJobs.length === 0 && (
          <p style={{ color: "#777" }}>
            You have not posted any jobs yet.
          </p>
        )}

        {recentJobs.map((job) => (
          <div key={job.id} style={jobCard}>
            <div>
              <strong>{job.title}</strong>
              <div style={{ color: "#777", fontSize: 14 }}>
                {job.location}
              </div>
            </div>

            <a
              href={`/employer/jobs/${job.id}`}
            >

              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #eee",
  minWidth: "160px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const jobCard = {
  padding: 16,
  border: "1px solid #eee",
  borderRadius: 8,
  marginBottom: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const primary = {
  padding: "10px 18px",
  background: "#2563eb",
  color: "#fff",
  textDecoration: "none",
  borderRadius: 6,
};

const secondary = {
  padding: "10px 18px",
  background: "#fff",
  border: "1px solid #e5e7eb",
  color: "#111",
  textDecoration: "none",
  borderRadius: 6,
};
