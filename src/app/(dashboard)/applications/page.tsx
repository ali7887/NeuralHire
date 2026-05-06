import React from "react";
import "./applications.css";
import { getUserFromRequest } from "@/lib/auth/get-user-from-request";
import { redirect } from "next/navigation";

export default async function ApplicationsDashboardPage() {
  const user = await getUserFromRequest(); 

  
  if (!user) {
    redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me/applications`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Error loading applications.</p>;
  }

  const { applications } = await res.json();

  return (
    <div className="page-container">
      <h1 className="page-title">Your Applications</h1>
      <div className="applications-list">
        {applications.length === 0 && <p>You have not applied to any jobs yet.</p>}
        {applications.map((app: any) => (
          <div key={app.id} className="application-item">
            <h2>{app.job.title}</h2>
            <p>Status: {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
