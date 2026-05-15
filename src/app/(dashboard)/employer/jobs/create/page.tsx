/* eslint-disable no-undef */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";

import { createJob } from "@/lib/mockJobs";

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
    createJob({
      title: form.title,
      description: form.description,
      location: form.location,
      salary: form.salary
        ? Number(form.salary)
        : undefined,
      skills: form.skills
        .split(",")
        .map((s) => s.trim()),
    });

    router.push("/employer/jobs");
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2
        style={{
          fontSize: "1.3rem",
          marginBottom: 16,
        }}
      >
        Create Job
      </h2>

      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        style={{
          width: "100%",
          marginTop: 16,
          padding: 12,
        }}
      />

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

      <div style={{ marginTop: 20 }}>
        <Button
          onClick={submit}
          style={{ backgroundColor: "#2563eb" }}
        >
          Create Job
        </Button>
      </div>

    </div>
  );
}
