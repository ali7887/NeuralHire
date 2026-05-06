"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { Input } from "@/components/ui/Input/Input/input";
import Button from "@/components/ui/Button";

type Role = "admin" | "employer" | "user";

type LoginOk = {
  success?: true;
  user: { id: string; email: string; role: Role; name?: string | null };
};

type LoginErr = {
  error?: string;
};

function isLoginOk(x: unknown): x is LoginOk {
  if (!x || typeof x !== "object") return false;
  const u = (x as any).user;
  return (
    u &&
    typeof u === "object" &&
    typeof u.id === "string" &&
    typeof u.email === "string" &&
    typeof u.role === "string"
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

    if (!email || !password) {
      setFormError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, rememberMe }),
      });

      // سعی کن JSON بخونی؛ اگر نشد متن خام را بگیر (برای debug)
      const contentType = res.headers.get("content-type") || "";
      const rawText = await res.text();

      const parsed: unknown =
        contentType.includes("application/json") && rawText
          ? JSON.parse(rawText)
          : null;

      if (!res.ok) {
        const msg =
          (parsed as LoginErr | null)?.error ||
          (rawText?.slice(0, 200) || null) ||
          "Request failed.";

        if (res.status === 400) setFormError(msg || "Invalid request data.");
        else if (res.status === 401) setFormError(msg || "Invalid email or password.");
        else if (res.status === 429) setFormError(msg || "Too many requests. Try again later.");
        else setFormError(msg || "An unexpected error occurred.");

        // کمک برای دیباگ
        console.error("LOGIN FAILED", { status: res.status, parsed, rawText });
        return;
      }

      if (!isLoginOk(parsed)) {
        console.error("LOGIN OK but invalid payload shape", { parsed, rawText });
        setFormError("Login succeeded but response was invalid.");
        return;
      }

      const role = parsed.user.role;

      if (role === "admin") router.push("/admin/dashboard");
      else if (role === "employer") router.push("/employer/dashboard");
      else router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setFormError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.authCard}>
      <h1 className={styles.title}>Sign in</h1>
      <p className={styles.subtitle}>Welcome back! Please enter your details.</p>

      <form autoComplete="off" onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="text"
          name="username"
          autoComplete="username"
          style={{ display: "none" }}
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          style={{ display: "none" }}
        />

        <div className={styles.fieldGroup}>
          <Input
            id="login-email"
            label="Email"
            name="auth_login_email"
            type="text"
            inputMode="email"
            autoComplete="new-email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.passwordRow}>
            <Input
              id="login-password"
              label="Password"
              name="auth_login_password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            <button
              type="button"
              className={styles.showPasswordButton}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className={styles.optionsRow}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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
          {isLoading ? (
            <span className={styles.buttonWithSpinner}>
              <span className={styles.spinner} />
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className={styles.footer}>
        <span>Don&apos;t have an account?</span>
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
