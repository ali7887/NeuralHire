/* eslint-disable no-undef */
"use client";

import React, { useState } from "react";
import styles from "./ai-generator.module.css";

interface AIJobGeneratorProps {
  jobTitle: string;
  companyName: string;
  location: string;
  onGenerated: (text: string) => void;
}

export default function AIJobGenerator({
  jobTitle,
  companyName,
  location,
  onGenerated,
}: AIJobGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateJobDescription = async () => {
    if (!jobTitle) {
      setError("Please enter a Job Title first.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/ai/employer/generate-job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: jobTitle, companyName, location }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to generate");

      // فرمت‌بندی متن تولید شده
      const formattedText = `
${data.summary}

### Key Responsibilities:
${data.responsibilities.map((r: string) => `• ${r}`).join("\n")}

### Requirements:
${data.requirements.map((r: string) => `• ${r}`).join("\n")}

### Benefits:
${data.benefits.map((b: string) => `• ${b}`).join("\n")}
      `.trim();

      onGenerated(formattedText);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.sparkleIcon}>✨</span>
          AI Assistant
        </div>
        <button
          type="button"
          className={styles.aiButton}
          onClick={generateJobDescription}
          disabled={isLoading || !jobTitle}
        >
          {isLoading ? "Generating..." : "Generate Description"}
        </button>
      </div>
      {error ? (
        <p className={styles.errorText}>{error}</p>
      ) : (
        <p className={styles.infoText}>
          Enter a job title to generate a professional description automatically.
        </p>
      )}
    </div>
  );
}
