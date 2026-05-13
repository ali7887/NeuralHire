"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

type CreateCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newCompany: any) => void;
  ownerId: string;
};

export default function CreateCompanyModal({
  isOpen,
  onClose,
  onCreated,
  ownerId,
}: CreateCompanyModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, website, logoUrl, description, ownerId }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create company");
        setLoading(false);
        return;
      }

      const newCompany = await res.json();
      onCreated(newCompany);
      onClose();
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 8,
          width: 400,
          maxWidth: "90%",
        }}
      >
        <h2>Create Company</h2>

        <Input
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <Input
          label="Logo URL"
          type="url"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

        <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button disabled={loading} variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button disabled={loading || !name} onClick={handleCreate}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
