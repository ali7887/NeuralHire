"use client";

import { useState } from "react";
import "@/styles/admin-settings.css"; 

export default function AdminSettingsPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Profile update failed");

      alert("✅ Profile updated successfully");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Password change failed");

      alert("✅ Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="settings-container">

      <h1 className="admin-page-title">Admin Settings</h1>

      <div className="settings-grid">

        {/* PROFILE */}
        <div className="settings-card">
          <h2>Public Profile</h2>

          <form autoComplete="off" onSubmit={updateProfile}>

            <div className="form-group">
              <label>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>

          </form>
        </div>

        {/* PASSWORD */}
        <div className="settings-card">
          <h2>Security</h2>

          <form autoComplete="off" onSubmit={changePassword}>

            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Change Password"}
            </button>

          </form>
        </div>

      </div>

      {/* LOGOUT BUTTON */}
      <div style={{ marginTop: "24px" }}>
        <button
          className="btn-danger"
          onClick={() => window.location.href = "/api/auth/logout"}
        >
          Logout
        </button>
      </div>

    </div>
  );
}
