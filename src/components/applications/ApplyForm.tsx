"use client";

import { useState } from "react";
import { applySchema } from "@/lib/validators/application";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function ApplyForm({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const formData = {
      coverLetter: (form.coverLetter as any).value,
      resumeUrl: (form.resumeUrl as any).value,
      jobId,
    };

    const parsed = applySchema.safeParse(formData);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    const res = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify(parsed.data),
    });

    if (res.ok) {
      toast.success("Application submitted!");
      router.push("/dashboard/applications");
    } else {
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <form autoComplete="off" onSubmit={onSubmit} className="space-y-6 border p-6 rounded-lg">
      <div>
        <label className="block font-medium">Cover Letter</label>
        <textarea name="coverLetter" className="w-full border p-2"></textarea>
      </div>

      <div>
        <label className="block font-medium">Resume URL</label>
        <input type="url" name="resumeUrl" className="w-full border p-2" />
      </div>

      <button disabled={loading} className="bg-blue-600 text-white px-6 py-3">
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
