"use client";

import { useEffect, useState } from "react";
import { Card, Button, Loader, Badge } from "@/components/ui";

type Company = {
  id: string;
  name: string;
  logoUrl?: string | null;
  website?: string | null;
  description?: string | null;
  ownerId: string;
};

function truncate(text: string, maxLength: number) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

export default function CompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

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
  const controller = new AbortController();

  async function loadCompanies() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/companies", {
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error("Failed fetching companies");
      }

      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Failed loading companies", err);
      }
    } finally {
      setLoading(false);
    }
  }

  loadCompanies();

  return () => controller.abort();
}, []);


  if (loading) return <Loader />;

  return (
    <Card>

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
          {companies.map((company) => (
            <tr key={company.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
              
              <td style={{ width: 64, padding: 8 }}>
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 6 }}
                  />
                ) : (
                  <Badge>NO LOGO</Badge>
                )}
              </td>

              <td>{company.name}</td>

              <td>
                {company.website ? (
                  <a href={company.website} target="_blank" rel="noreferrer" className="link">
                    {company.website}
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td>{truncate(company.description || "", 60)}</td>

              <td style={{ display: "flex", gap: 8 }}>
                <Button size="sm" variant="secondary">
                  Edit
                </Button>
                <Button size="sm" variant="danger">
                  Delete
                </Button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </Card>
  );
}
