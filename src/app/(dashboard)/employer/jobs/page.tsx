/* eslint-disable no-undef */
"use client";

import { useEffect, useState } from "react";

export default function JobsListPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("/api/jobs/list", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => r.json())
      .then((data) => setJobs(data.jobs || []));
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "1.3rem", marginBottom: 20 }}>Your Jobs</h2>

      {jobs.length === 0 ? (
        <p>No job postings yet.</p>
      ) : (
        <>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: "#fff",
                padding: 16,
                borderRadius: 8,
                marginBottom: 12,
                border: "1px solid #eee",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <strong style={{ fontSize: 16 }}>{job.title}</strong>

              <div style={{ fontSize: 14, color: "#666", marginTop: 6 }}>
                {job.location}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
