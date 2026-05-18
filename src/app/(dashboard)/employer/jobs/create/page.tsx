/* eslint-disable no-undef */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button/Button";
import { createJob } from "@/lib/mockJobs";
import AIJobGenerator from "@/components/employer/ai/AIJobGenerator/AIJobGenerator";

export default function CreateJobPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = () => {
    if (!form.title || !form.description || !form.location) {
      alert("Please fill required fields");
      return;
    }

    createJob({
      title: form.title,
      description: form.description,
      location: form.location,
      salary: form.salary ? Number(form.salary) : null,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),

      isRemote: false,
      type: "full-time",
      level: "mid",

      companyId: "demo-company",
      employerId: "demo-employer",

      isActive: true,
      published: true,
      status: "open",
    });

    router.push("/employer/jobs");
  };

  const textarea: React.CSSProperties = {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 14,
    marginTop: 4,
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 24,
          border: "1px solid #e5e7eb",
        }}
      >
        <h2>Create Job</h2>

        <Input
          label="Job Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <AIJobGenerator
          jobTitle={form.title}
          companyName="Your Company"
          location={form.location}
          onGenerated={(text: string) =>
            setForm((prev) => ({
              ...prev,
              description: text,
            }))
          }
        />

        <div style={{ marginTop: 16 }}>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={8}
            style={textarea}
          />
        </div>

        <Input
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <Input
          label="Salary"
          name="salary"
          value={form.salary}
          onChange={handleChange}
        />

        <Input
          label="Skills (comma separated)"
          name="skills"
          value={form.skills}
          onChange={handleChange}
        />

        <div style={{ marginTop: 24 }}>
          <Button
            onClick={submit}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Create Job
          </Button>
        </div>

      </div>
    </div>
  );
}
