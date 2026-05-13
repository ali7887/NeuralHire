"use client";

import { useEffect, useState } from "react";
import { Card, Button, Loader, Badge } from "@/components/ui";
import CompanyFormModal from "./CompanyFormModal";
import type { Company } from "@/lib/types/company.types";




type CompaniesTableProps = {
  additionalCompanies?: Company[];
};

export default function CompaniesTable({ additionalCompanies = [] }: CompaniesTableProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [modal, setModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data: Company | null;
  }>({
    open: false,
    mode: "create",
    data: null,
  });

  async function fetchCompanies() {
    try {
      const res = await fetch("/api/admin/companies");
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      console.error("Failed loading companies", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) return <Loader />;

  const allCompanies = [...additionalCompanies, ...companies];

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this company?")) return;

    setDeleting(id);

    try {
      const res = await fetch(`/api/admin/companies/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete company");
        return;
      }

      setCompanies((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      alert("Network error while deleting.");
      console.error(error);
    } finally {
      setDeleting(null);
    }
  }

  function handleEdit(company: Company) {
    setModal({
      open: true,
      mode: "edit",
      data: company,
    });
  }

  function handleCreate() {
    setModal({
      open: true,
      mode: "create",
      data: null,
    });
  }

  function handleSuccess(company: Company) {
    if (modal.mode === "create") {
      setCompanies((prev) => [company, ...prev]);
    } else {
      setCompanies((prev) =>
        prev.map((c) => (c.id === company.id ? company : c))
      );
    }
  }

  return (
    <>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={handleCreate}>Add Company</Button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
              <th>Logo</th>
              <th>Name</th>
              <th>Website</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {allCompanies.map((company) => (
              <tr key={company.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ width: 64, padding: 8 }}>
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      style={{
                        width: 48,
                        height: 48,
                        objectFit: "contain",
                        borderRadius: 6,
                      }}
                    />
                  ) : (
                    <Badge>NO LOGO</Badge>
                  )}
                </td>

                <td>{company.name}</td>

                <td>
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                    >
                      {company.website}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  {company.description
                    ? company.description.length > 60
                      ? company.description.slice(0, 60) + "…"
                      : company.description
                    : "-"}
                </td>

                <td style={{ display: "flex", gap: 8 }}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(company)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    disabled={deleting === company.id}
                    onClick={() => handleDelete(company.id)}
                  >
                    {deleting === company.id ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <CompanyFormModal
        open={modal.open}
        mode={modal.mode}
        initialData={modal.data}
        onClose={() => setModal({ ...modal, open: false })}
        onSuccess={handleSuccess}
      />
    </>
  );
}
