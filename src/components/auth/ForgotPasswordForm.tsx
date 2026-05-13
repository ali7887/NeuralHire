"use client";

import React, { useState } from "react";
import styles from "../ui/form.module.css";
import { Input } from "../ui/Input/Input/input";
import Button from "../ui/Button";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      // eslint-disable-next-line no-undef
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to send reset link");
      } else {
        toast.success("Reset link sent! Please check your email.");
      }
    } catch {
      toast.error("Network error, please try again");
    }

    setLoading(false);
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Forgot password</h2>
      <p className={styles.subtitle}>We will send a reset link</p>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />


      <Button
        fullWidth
        loading={loading}
        style={{
          backgroundColor: '#2563eb',
          color: '#ffffff'
        }}
      >
        Send Reset Link
      </Button>

    </form>
  );
}
