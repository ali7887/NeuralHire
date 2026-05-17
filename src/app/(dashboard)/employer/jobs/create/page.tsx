/* eslint-disable no-undef */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button/Button";
import { createJob } from "@/lib/mockJobs";

export default function CreateJobPage() {
  const router = useRouter();

  // useEffect(() => {
  //   const role = localStorage.getItem("userRole");

  //   if (role !== "employer") {
  //     router.push("/post-job");
  //   }
  // }, [router]);

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
      skills: form.skills.split(",").map((s) => s.trim()),
      isRemote: null,
      type: null,
      level: null,
      companyId: null,
      employerId: null,
      isActive: null,
      published: null,
      status: "draft"
    });

    router.push("/employer/jobs");
  };

  const container: React.CSSProperties = {
    maxWidth: 700,
  };

  const card: React.CSSProperties = {
    background: "#fff",
    borderRadius: 10,
    padding: 24,
    border: "1px solid #e5e7eb",
  };

  const title: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 8,
  };

  const subtitle: React.CSSProperties = {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  };

  const textarea: React.CSSProperties = {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 14,
    marginTop: 4,
  };

  const field: React.CSSProperties = {
    marginTop: 16,
  };

  const btn: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    fontSize: 13,
    display: "inline-block",
  };

  return (
    <div style={container}>
      <div style={card}>
        <div style={title}>Create Job</div>
        <div style={subtitle}>
          Publish a new job listing for candidates
        </div>

        <Input
          label="Job Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <div style={field}>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
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
          <Button onClick={submit} style={btn}>
            Create Job
          </Button>
        </div>
      </div>
    </div>
  );
}
