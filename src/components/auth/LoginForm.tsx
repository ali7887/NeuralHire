 
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { Input } from "@/components/ui/Input/Input/input";
import Button from "@/components/ui/Button";
import { getRedirectPathByRole } from "@/lib/auth/redirect";

type Role = "admin" | "employer" | "job-seeker";

type LoginOk = {
  user: {
    id: string;
    email: string;
    role: Role;
    name?: string | null;
  };
};

type LoginErr = {
  error?: string;
};

function isLoginOk(data: unknown): data is LoginOk {
  if (!data || typeof data !== "object") return false;

  const user = (data as any).user;

  return (
    user &&
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.role === "string"
  );
}

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function validateEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setFormError(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setFormError("Email and password are required.");
      return;
    }

    if (!validateEmail(normalizedEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          rememberMe,
        }),
      });

      let data: unknown;

      try {
        data = await res.json();
      } catch {
        setFormError("Invalid server response.");
        return;
      }

      if (!res.ok) {
        const err = data as LoginErr;
        setFormError(err.error || "Login failed.");
        return;
      }

      if (!isLoginOk(data)) {
        setFormError("Invalid server response.");
        return;
      }

      console.log("LOGIN_RESPONSE", data);
      console.log("USER_ROLE", data.user.role);

      const redirectPath = getRedirectPathByRole(data.user.role);

      // ذخیره role برای استفاده در UI
      localStorage.setItem("userRole", data.user.role);

      router.push(redirectPath);
      router.refresh();

    } catch (err) {
      console.error("[LOGIN_ERROR]", err);
      setFormError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.authCard}>
      <h1 className={styles.title}>Sign in</h1>

      <p className={styles.subtitle}>
        Welcome back! Please enter your details.
      </p>

      <form
        onSubmit={handleSubmit}
        className={styles.loginForm}
        autoComplete="off"
      >
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <div className={styles.passwordRow}>
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <button
            type="button"
            className={styles.showPasswordButton}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className={styles.optionsRow}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className={styles.forgotPassword}
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?
          </button>
        </div>

        {formError && (
          <p className={`${styles.formError} ${styles.formErrorVisible}`}>
            {formError}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className={styles.loginSubmitButton}
          fullWidth
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className={styles.footer}>
        <span>Dont have an account?</span>

        <button
          type="button"
          className={styles.registerLink}
          onClick={() => router.push("/register")}
        >
          Register now
        </button>
      </div>
    </div>
  );
}
