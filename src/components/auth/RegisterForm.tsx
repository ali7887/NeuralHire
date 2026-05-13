"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { Input } from "@/components/ui/Input/Input/input";
import Button from "@/components/ui/Button";

type Role = "employer" | "job-seeker";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("job-seeker");

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function validateEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!name || !email || !password) {
      setFormError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // eslint-disable-next-line no-undef
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Registration failed.");
        return;
      }

      if (data.user.role === "employer") {
        router.push("/employer/dashboard");
      } else {
        router.push("/dashboard");
      }

    } catch (err) {
      // eslint-disable-next-line no-undef
      console.error(err);
      setFormError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.authCard}>
      <h1 className={styles.title}>Create account</h1>
      <p className={styles.subtitle}>
        Join the platform and start your journey.
      </p>

      <form onSubmit={handleSubmit} className={styles.registerForm} autoComplete="off">

        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <div className={styles.roleGroup}>
          <span className={styles.roleLabel}>Account type</span>

          <label className={styles.roleOption}>
            <input
              type="radio"
              name="role"
              value="job-seeker"
              checked={role === "job-seeker"}
              onChange={() => setRole("job-seeker")}
            />
            Job seeker
          </label>

          <label className={styles.roleOption}>
            <input
              type="radio"
              name="role"
              value="employer"
              checked={role === "employer"}
              onChange={() => setRole("employer")}
            />
            Employer
          </label>
        </div>

        {formError && (
          <p className={styles.formError}>{formError}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className={styles.registerSubmitButton}
          fullWidth
        >
          {loading ? "Creating account..." : "Create account"}
        </Button>


      </form>

      <div className={styles.footer}>
        <span>Already have an account?</span>

        <button
          type="button"
          className={styles.loginLink}
          onClick={() => router.push("/login")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
