"use client";

import { useState } from "react";
import Button from "../ui/Button/Button";

interface ApplicationFormProps {
  jobId: string;
  onSuccess?: () => void;
}

export default function ApplicationForm({ jobId, onSuccess }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, message }),
      });
      if (res.ok) onSuccess?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Cover letter..."
        className="w-full border rounded p-2 min-h-[120px]"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  );
}
