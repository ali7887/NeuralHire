//D:\project\NEW\neuralhire\NeuralHire\src\components\admin\companies\CompanyFormModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import type { Company } from "@/lib/types/company.types";

type CompanyForm = {
  name: string;
  website: string;
  logoUrl: string;
  description: string;
  ownerId: string;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Company | null;
  onClose: () => void;
  onSuccess: (company: Company) => void;
};

type CompanyFormModalContentProps = {
  mode: "create" | "edit";
  initialData?: Company | null;
  onClose: () => void;
  onSuccess: (company: Company) => void;
};

function createEmptyCompanyForm(): CompanyForm {
  return {
    name: "",
    website: "",
    logoUrl: "",
    description: "",
    ownerId: "system-admin",
  };
}

function createCompanyFormFromInitialData(
  mode: "create" | "edit",
  initialData?: Company | null
): CompanyForm {
  if (mode === "edit" && initialData) {
    return {
      name: initialData.name ?? "",
      website: initialData.website ?? "",
      logoUrl: initialData.logoUrl ?? "",
      description: initialData.description ?? "",
      ownerId: initialData.ownerId ?? "system-admin",
    };
  }

  return createEmptyCompanyForm();
}

function CompanyFormModalContent({
  mode,
  initialData,
  onClose,
  onSuccess,
}: CompanyFormModalContentProps) {
  const [form, setForm] = useState<CompanyForm>(() =>
    createCompanyFormFromInitialData(mode, initialData)
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setLoading(true);

  try {
    if (mode === "create") {
      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Failed to save company");
        return;
      }

      const data = (await res.json()) as Company;
      onSuccess(data);
    } else {
      // ✅ TypeScript now knows we are in "edit" branch
      if (!initialData?.id) {
        alert("Company ID is missing");
        return;
      }

      const res = await fetch(
        `/api/admin/companies/${initialData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        alert("Failed to save company");
        return;
      }

      const updatedCompany: Company = {
        id: initialData.id, // ✅ now 100% string
        name: form.name,
        website: form.website || null,
        logoUrl: form.logoUrl || null,
        description: form.description || null,
        ownerId: form.ownerId,
      };

      onSuccess(updatedCompany);
    }

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
            onChange={(e) =>
              setForm((currentForm) => ({
                ...currentForm,
                name: e.target.value,
              }))
            }
            required
          />

          <input
            style={inputStyle}
            placeholder="Website"
            value={form.website}
            onChange={(e) =>
              setForm((currentForm) => ({
                ...currentForm,
                website: e.target.value,
              }))
            }
          />

          <input
            style={inputStyle}
            placeholder="Logo URL"
            value={form.logoUrl}
            onChange={(e) =>
              setForm((currentForm) => ({
                ...currentForm,
                logoUrl: e.target.value,
              }))
            }
          />

          <textarea
            style={{ ...inputStyle, minHeight: 80 }}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((currentForm) => ({
                ...currentForm,
                description: e.target.value,
              }))
            }
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

export default function CompanyFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSuccess,
}: Props) {
  if (!open) return null;

  return (
    <CompanyFormModalContent
      key={`${mode}-${initialData?.id ?? "new"}`}
      mode={mode}
      initialData={initialData}
      onClose={onClose}
      onSuccess={onSuccess}
    />
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
