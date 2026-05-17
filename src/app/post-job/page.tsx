/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-undef */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");

    if (storedRole === "employer") {
      router.replace("/employer/jobs/create");
      return;
    }

    setCheckedAuth(true);
  }, [router]);

  if (!checkedAuth) return null;

  return (
    <div style={container}>
      <h1 style={title}>Post a Job</h1>

      <p style={text}>
        You need an employer account to publish job listings.
      </p>

      <div style={buttons}>
        <button
          style={primary}
          onClick={() => router.push("/register?role=employer")}
        >
          Create Employer Account
        </button>

        <button
          style={secondary}
          onClick={() => router.push("/jobs")}
        >
          Browse Jobs Instead
        </button>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  maxWidth: 720,
  margin: "140px auto",
  textAlign: "center",
  padding: "0 20px",
};

const title: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 700,
  marginBottom: 12,
};

const text: React.CSSProperties = {
  fontSize: 16,
  color: "#6b7280",
  marginBottom: 32,
};

const buttons: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 16,
};

const primary: React.CSSProperties = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "#fff",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
};

const secondary: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
};
