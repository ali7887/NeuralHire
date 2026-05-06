"use client";
import { useState } from "react";

export default function EditJob({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch(`/api/admin/jobs/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <form autoComplete="off" onSubmit={submitHandler}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job title"
      />
      <button type="submit">Save</button>
    </form>
  );
}
