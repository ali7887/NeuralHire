/* eslint-disable no-undef */
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "90px 0 70px", // فاصله 50-60px از هدر
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* HERO */}
      <section
        style={{
          textAlign: "center",
          marginBottom: 50,
          paddingTop: 10,
          maxWidth: 720,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Contact Us
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          We’d love to collaborate, answer your questions, and hear your feedback.
        </p>
      </section>

      {/* CONTACT FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Message Sent!");
        }}
        style={{
          maxWidth: 520,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          background:
            "radial-gradient(circle at top right, rgba(148,163,184,0.14), transparent 55%), rgba(15,23,42,0.9)",
          padding: "35px 32px",
          borderRadius: 18,
          border: "1px solid rgba(148,163,184,0.25)",
          boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
          backdropFilter: "blur(4px)",
        }}
      >
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{
            padding: 14,
            borderRadius: 8,
            border: "1px solid rgba(148,163,184,0.25)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: 15,
            outline: "none",
          }}
        />

        <input
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{
            padding: 14,
            borderRadius: 8,
            border: "1px solid rgba(148,163,184,0.25)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: 15,
            outline: "none",
          }}
        />

        <textarea
          placeholder="Your Message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{
            padding: 14,
            borderRadius: 8,
            border: "1px solid rgba(148,163,184,0.25)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: 15,
            outline: "none",
            resize: "vertical",
          }}
        />

        <button
          style={{
            background: "#2563eb",
            padding: "14px 20px",
            borderRadius: 8,
            border: "none",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
