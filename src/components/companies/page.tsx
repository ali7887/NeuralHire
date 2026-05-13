import CompaniesTable from "@/components/companies/CompaniesTable";
import { Button } from "@/components/ui";

export default function AdminCompaniesPage() {

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

        <Button>
          Create Company
        </Button>
      </div>

      <CompaniesTable />

    </div>
  );
}
