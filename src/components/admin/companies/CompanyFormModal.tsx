"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import type { Company } from "@/lib/types/company.types";


type CompanyForm = {
  name: string;
  website?: string | null;
  logoUrl?: string | null;
  description?: string | null;
  ownerId: string;
};

const [form, setForm] = useState<CompanyForm>({
  name: "",
  website: "",
  logoUrl: "",
  description: "",
  ownerId: "system-admin",
});

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Company | null;
  onClose: () => void;
  onSuccess: (company: Company) => void;
};

export default function CompanyFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    website: "",
    logoUrl: "",
    description: "",
    ownerId: "system-admin",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        name: initialData.name || "",
        website: initialData.website || "",
        logoUrl: initialData.logoUrl || "",
        description: initialData.description || "",
        ownerId: initialData.ownerId,
      });
    } else {
      setForm({
        name: "",
        website: "",
        logoUrl: "",
        description: "",
        ownerId: "system-admin",
      });
    }
  }, [mode, initialData, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        mode === "create"
          ? "/api/admin/companies"
          : `/api/admin/companies/${initialData?.id}`;

      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Failed to save company");
        return;
      }

      const data = await res.json();

      onSuccess(mode === "create" ? data : { ...initialData, ...form });

      onClose();
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: 16 }}>
          {mode === "create" ? "Create Company" : "Edit Company"}
        </h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            style={inputStyle}
            placeholder="Company Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            style={inputStyle}
            placeholder="Website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />

          <input
            style={inputStyle}
            placeholder="Logo URL"
            value={form.logoUrl}
            onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          />

          <textarea
            style={{ ...inputStyle, minHeight: 80 }}
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modalStyle: React.CSSProperties = {
  width: 420,
  background: "#fff",
  borderRadius: 8,
  padding: 24,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  border: "1px solid #ddd",
  borderRadius: 6,
  fontSize: 14,
};
