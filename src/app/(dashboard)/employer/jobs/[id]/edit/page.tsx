/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJob, updateJob } from "@/lib/mockJobs";

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

useEffect(() => {
  const job = getJob(params.id);
  if (!job) return;

    setTitle(job.title);
    setLocation(job.location);
  }, [params.id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    updateJob(params.id, {
      title,
      location,
    });

    router.push("/employer/jobs");
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Edit Job</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job title"
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
