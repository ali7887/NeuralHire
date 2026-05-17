/* eslint-disable no-undef */
"use client";

import { useState } from "react";

export default function JobDescriptionForm() {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [seniority, setSeniority] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");

    const response = await fetch("/api/ai/job-description", {
      method: "POST",
      body: JSON.stringify({
        title,
        skills: skills.split(",").map((s) => s.trim()),
        seniority,
      }),
    });

    const data = await response.json();
    setResult(data.description || "No response from AI");
    setLoading(false);
  }

  return (
    <div>
      <h2>AI Job Description Generator</h2>

      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <input
        placeholder="Seniority Level"
        value={seniority}
        onChange={(e) => setSeniority(e.target.value)}
      />

      <button onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Generated Description:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
