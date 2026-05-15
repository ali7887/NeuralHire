/* eslint-disable no-undef */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import type { Job } from "@/lib/mockJobs";

type Props = {
  jobData: Job;
  onSave: (updatedJob: Partial<Job>) => Promise<void>;
};

export default function EditJobForm({ jobData, onSave }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(jobData.title ?? "");
  const [description, setDescription] = useState(jobData.description ?? "");
  const [location, setLocation] = useState(jobData.location ?? "");
  const [salary, setSalary] = useState(jobData.salary?.toString() ?? "");
  const [skills, setSkills] = useState((jobData.skills ?? []).join(", "));


  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      const parsedSkills = skills
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);

      const updatedJob: Partial<Job> = {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        salary: salary.trim() === "" ? undefined : Number(salary),
        skills: parsedSkills,
      };


      await onSave(updatedJob);

      router.push("/employer/jobs");
      router.refresh();
    } catch (error) {
      console.error("Failed to update job:", error);
      alert("Failed to update job");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Edit Job</h1>
        <p style={subtitleStyle}>Update your job posting information</p>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Frontend Developer"
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe the role..."
            style={textareaStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Tehran / Remote"
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            min={0}
            placeholder="5000"
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Skills</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Next.js, TypeScript"
            style={inputStyle}
          />
          <p style={hintStyle}>Separate skills with commas</p>
        </div>

        {/* Actions */}
        <div style={actionsStyle}>
          <button
            type="button"
            onClick={() => router.back()}
            style={secondaryButtonStyle}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            style={{
              ...primaryButtonStyle,
              backgroundColor: "#2563eb",
              opacity: saving ? 0.7 : 1,
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ======================================================================== */
/* Inline Styles */
/* ======================================================================== */

const containerStyle: React.CSSProperties = { maxWidth: 720 };
const headerStyle: React.CSSProperties = { marginBottom: 24 };
const titleStyle: React.CSSProperties = { fontSize: 28, fontWeight: 700, marginBottom: 8 };
const subtitleStyle: React.CSSProperties = { color: "#6b7280", fontSize: 14 };
const formStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 20 };
const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column" };
const labelStyle: React.CSSProperties = { marginBottom: 8, fontWeight: 600, fontSize: 14 };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: 14,
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 140,
  resize: "vertical",
};

const hintStyle: React.CSSProperties = { marginTop: 6, fontSize: 12, color: "#6b7280" };

const actionsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginTop: 8,
};

const primaryButtonStyle: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: 10,
  border: "none",
  backgroundColor: "#2563eb",
  color: "#fff",
  fontWeight: 600,
  transition: "0.2s",
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111827",
  fontWeight: 600,
  cursor: "pointer",
};
