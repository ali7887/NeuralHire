/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardStats, getJobs, Job } from "@/lib/mockJobs";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

type Stats = {
  activeJobs: number;
  applications: number;
  draftJobs: number;
};

export default function EmployerDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    activeJobs: 0,
    applications: 0,
    draftJobs: 0,
  });

  const [recentJobs, setRecentJobs] = useState<Job[]>([]);

  useEffect(() => {
    const dashboardStats = getDashboardStats();
    if (dashboardStats) {
      setStats(dashboardStats);
    }

    const jobs = getJobs();
    setRecentJobs(jobs.slice(0, 5));
  }, []);

  return (
    <div style={{ padding: "24px 40px" }}>
      <DashboardHeader role="employer" />

      <h2 style={{ fontSize: 22, marginBottom: 24 }}>
        Overview
      </h2>

      <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
        <StatCard label="Active Jobs" value={stats.activeJobs} />
        <StatCard label="Applications" value={stats.applications} />
        <StatCard label="Draft Jobs" value={stats.draftJobs} />
      </div>

      <div style={{ marginBottom: 50 }}>
        <h3 style={{ marginBottom: 16 }}>Quick Actions</h3>

        <div style={{ display: "flex", gap: 14 }}>
          <Link href="/employer/jobs/create" style={primary}>
            + Create Job
          </Link>

          <Link href="/employer/jobs" style={secondary}>
            View All Jobs
          </Link>
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

            <Link
              href={`/employer/jobs/${job.id}`}
              style={{ color: "#2563eb" }}
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 22,
        borderRadius: 12,
        border: "1px solid #eee",
        minWidth: 180,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{label}</div>
      <strong style={{ fontSize: 26 }}>{value}</strong>
    </div>
  );
}

const primary = {
  padding: "10px 18px",
  background: "#2563eb",
  color: "#fff",
  borderRadius: 8,
  textDecoration: "none",
};

const secondary = {
  padding: "10px 18px",
  background: "#fff",
  border: "1px solid #e5e7eb",
  color: "#111",
  borderRadius: 8,
  textDecoration: "none",
};

const jobCard = {
  padding: 18,
  border: "1px solid #eee",
  borderRadius: 10,
  marginBottom: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
