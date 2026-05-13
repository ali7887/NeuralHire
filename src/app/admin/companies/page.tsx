"use client";

import { useState } from "react";
import CompaniesTable from "@/components/admin/companies/CompaniesTable";
import CreateCompanyModal from "@/components/admin/companies/CreateCompanyModal";
import { Button } from "@/components/ui";
import type { Company } from "@/lib/types/company.types";

export default function AdminCompaniesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

const [companies, setCompanies] = useState<Company[]>([]);



  
  const ownerId = "00000000-0000-0000-0000-000000000001";

  function handleCreated(newCompany: any) {
    setCompanies((prev) => [newCompany, ...prev]);
  }

  return (
    <div className="admin-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h1 className="admin-page-title">Manage Companies</h1>

        <Button onClick={() => setIsModalOpen(true)}>Create Company</Button>
      </div>

      <CreateCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleCreated}
        ownerId={ownerId}
      />

      <CompaniesTable additionalCompanies={companies} />
    </div>
  );
}
