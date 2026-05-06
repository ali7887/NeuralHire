"use client";

import React, { useState } from "react";

export default function CreateJob() {
  const [title, setTitle] = useState("");

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/admin/jobs", {
      method: "POST",
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
      <button type="submit">Create</button>
    </form>
  );
}
